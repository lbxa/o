import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { $DrizzleSchema, CommunitiesTable } from "@o/db";
import { eq } from "drizzle-orm";

import { $C } from "@/constants";
import { DbService } from "@/db/db.service";
import { ImageType, MultiSizedImageResult } from "@/services/image/image.types";
import { SharedImageService } from "@/services/image/shared-image.service";
import { ErrorWithMessage } from "@/utils";

import { S3Service } from "../s3/s3.service";

@Injectable()
export class CommunityImageService {
  private readonly logger = new Logger(CommunityImageService.name);

  constructor(
    @Inject($C.S3.PROVIDER_NAMES.COMMUNITY_S3_SERVICE)
    private readonly s3Service: S3Service,
    private readonly dbService: DbService<typeof $DrizzleSchema>,
    private readonly sharedImageService: SharedImageService
  ) {}

  /**
   * Upload a community image to S3
   * @param file - The image buffer
   * @param mimeType - The MIME type of the image
   * @param communityId - The community ID
   * @returns Promise with the uploaded image details
   */
  async uploadCommunityImage(
    file: Buffer,
    mimeType: string,
    communityId: number
  ): Promise<MultiSizedImageResult> {
    if (!file || file.length === 0) {
      throw new BadRequestException("File is required");
    }

    try {
      // Use the shared image service to handle resizing and uploading
      const result = await this.sharedImageService.uploadResizedImages(
        file,
        mimeType,
        communityId,
        this.s3Service
      );

      const refreshed = await this.refreshCommunityImageUrl(communityId);
      if (!refreshed) {
        throw new BadRequestException("Failed to refresh community image URL");
      }

      return result;
    } catch (error) {
      const err = error as ErrorWithMessage;
      this.logger.error(`Failed to upload image: ${err.message}`, err.stack);
      throw new BadRequestException(`Failed to upload image: ${err.message}`);
    }
  }

  /**
   * Delete a community image from S3
   * @param communityId - The community ID
   * @returns Promise indicating success
   */
  async deleteCommunityImage(communityId: number): Promise<boolean> {
    if (!communityId) {
      throw new BadRequestException("Community ID is required");
    }

    try {
      const communityFolder = `${communityId}`;
      const deleted = await this.s3Service.deleteFolder(communityFolder);
      await this.dbService.db
        .update(CommunitiesTable)
        .set({ imageUrl: null })
        .where(eq(CommunitiesTable.id, communityId));

      return deleted;
    } catch (error) {
      const err = error as ErrorWithMessage;
      this.logger.error(
        `Failed to delete community image: ${err.message}`,
        err.stack
      );
      throw new BadRequestException(
        `Failed to delete community image: ${err.message}`
      );
    }
  }

  /**
   * Get the public URL for a community image
   * @param communityId - The community ID
   * @returns The public URL
   */
  getCommunityImageUrl(communityId: number, resolution: ImageType): string {
    if (!communityId) {
      throw new BadRequestException("Community ID is required");
    }

    return this.sharedImageService.getImageResolutionUrl(
      communityId,
      resolution,
      this.s3Service.getBaseUrl
    );
  }

  /**
   * Get the public URLs for all resolutions of a community's image
   * @param communityId - The community ID
   * @returns Object with URLs for all resolutions
   */
  getCommunityImageUrls(communityId: number): MultiSizedImageResult {
    if (!communityId) {
      throw new BadRequestException("Community ID is required");
    }

    return this.sharedImageService.getImageUrls(
      communityId,
      this.s3Service.getBaseUrl
    );
  }

  async refreshCommunityImageUrl(communityId: number): Promise<boolean> {
    const t = Date.now();
    const communityImageUrl = await this.dbService.db
      .update(CommunitiesTable)
      .set({
        imageUrl: {
          thumbnail:
            this.s3Service.getBaseUrl + `/${communityId}/thumbnail.jpg?t=${t}`,
          small: this.s3Service.getBaseUrl + `/${communityId}/small.jpg?t=${t}`,
          medium:
            this.s3Service.getBaseUrl + `/${communityId}/medium.jpg?t=${t}`,
          large: this.s3Service.getBaseUrl + `/${communityId}/large.jpg?t=${t}`,
        },
      })
      .where(eq(CommunitiesTable.id, communityId));

    return communityImageUrl.rowCount ? communityImageUrl.rowCount > 0 : false;
  }
}
