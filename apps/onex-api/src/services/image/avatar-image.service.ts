import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { $DrizzleSchema, UsersTable } from "@o/db";
import { eq } from "drizzle-orm";

import { $C } from "@/constants";
import { DbService } from "@/db/db.service";
import { ErrorWithMessage } from "@/utils";

import { S3Service } from "../s3";
import { ImageType, MultiSizedImageResult } from "./image.types";
import { SharedImageService } from "./shared-image.service";

export interface ImageUploadResult {
  key: string;
  url: string;
}

export interface PresignedUrlResult {
  key: string;
  presignedUrl: string;
}

@Injectable()
export class AvatarImageService {
  private readonly logger = new Logger(AvatarImageService.name);

  constructor(
    @Inject($C.S3.PROVIDER_NAMES.AVATAR_S3_SERVICE)
    private readonly s3Service: S3Service,
    private readonly dbService: DbService<typeof $DrizzleSchema>,
    private readonly sharedImageService: SharedImageService
  ) {}

  /**
   * Upload an image to S3
   * @param file - The image buffer
   * @param mimeType - The MIME type of the image
   * @param userId - The user ID
   * @returns Promise with the uploaded image details
   */
  async uploadAvatarImage(
    file: Buffer,
    mimeType: string,
    userId: number
  ): Promise<MultiSizedImageResult> {
    if (!file || file.length === 0) {
      throw new BadRequestException("File is required");
    }

    try {
      // Use the shared image service to handle resizing and uploading
      const result = await this.sharedImageService.uploadResizedImages({
        file,
        mimeType,
        entityKey: userId.toString(),
        uploader: this.s3Service,
      });

      const refreshed = await this.refreshAvatarUrl(userId);
      if (!refreshed) {
        throw new BadRequestException("Failed to refresh avatar URL");
      }

      return result;
    } catch (error) {
      const err = error as ErrorWithMessage;
      this.logger.error(`Failed to upload image: ${err.message}`, err.stack);
      throw new BadRequestException(`Failed to upload image: ${err.message}`);
    }
  }

  /**
   * Delete an avatar image and all its resolutions from S3
   * @param userId - The user ID
   * @returns Promise indicating success
   */
  async deleteAvatarImage(userId: number): Promise<boolean> {
    if (!userId) {
      throw new BadRequestException("User ID is required");
    }

    try {
      const userFolder = `${userId}`;
      const deleted = await this.s3Service.deleteFolder(userFolder);
      await this.dbService.db
        .update(UsersTable)
        .set({ avatarUrl: null })
        .where(eq(UsersTable.id, userId));

      return deleted;
    } catch (error) {
      const err = error as ErrorWithMessage;
      this.logger.error(
        `Failed to delete avatar images: ${err.message}`,
        err.stack
      );
      throw new BadRequestException(
        `Failed to delete avatar images: ${err.message}`
      );
    }
  }

  /**
   * Get the public URLs for all resolutions of a user's avatar
   * @param userId - The user ID
   * @returns Object with URLs for all resolutions
   */
  getAvatarUrls(userId: number): MultiSizedImageResult {
    if (!userId) {
      throw new BadRequestException("User ID is required");
    }

    return this.sharedImageService.getImageUrls(
      userId,
      this.s3Service.getBaseUrl
    );
  }

  /**
   * Get a specific resolution URL for a user's avatar
   * @param userId - The user ID
   * @param resolution - The resolution to get (low, med, high, or original)
   * @returns The public URL for the requested resolution
   */
  getAvatarResolutionUrl(userId: number, resolution: ImageType): string {
    if (!userId) {
      throw new BadRequestException("User ID is required");
    }

    return this.sharedImageService.getImageResolutionUrl(
      userId,
      resolution,
      this.s3Service.getBaseUrl
    );
  }

  async refreshAvatarUrl(userId: number): Promise<boolean> {
    const t = Date.now();
    const avatarUrl = await this.dbService.db
      .update(UsersTable)
      .set({
        avatarUrl: {
          thumbnail:
            this.s3Service.getBaseUrl + `/${userId}/thumbnail.jpg?t=${t}`,
          small: this.s3Service.getBaseUrl + `/${userId}/small.jpg?t=${t}`,
          medium: this.s3Service.getBaseUrl + `/${userId}/medium.jpg?t=${t}`,
          large: this.s3Service.getBaseUrl + `/${userId}/large.jpg?t=${t}`,
        },
      })
      .where(eq(UsersTable.id, userId));

    return avatarUrl.rowCount ? avatarUrl.rowCount > 0 : false;
  }
}
