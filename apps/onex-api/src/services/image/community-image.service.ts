import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { $DrizzleSchema, CommunitiesTable } from "@o/db";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

import { $C } from "@/constants";
import { DbService } from "@/db/db.service";
import { ImageType, MultiSizedImageResult } from "@/services/image/image.types";
import { SharedImageService } from "@/services/image/shared-image.service";
import { ImageInput } from "@/types/graphql";
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
    communityId?: number
  ): Promise<MultiSizedImageResult> {
    if (file.length === 0) {
      throw new BadRequestException("File is required");
    }

    const uuid = uuidv4();

    try {
      // Use the shared image service to handle resizing and uploading
      const result = await this.sharedImageService.uploadResizedImages({
        file,
        mimeType,
        entityKey: uuid,
        uploader: this.s3Service,
      });

      if (communityId) {
        const set = await this.setCommunityImageUrl(communityId, uuid);
        if (!set) {
          throw new BadRequestException("Failed to set community image URL");
        }
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
      /**
       * S3 storage is so cheap there is no need to delete the folder.
       * Keep things for now but we'll need a table to track deleted images
       * so they don't become phantoms in storage.
       */
      // const deleted = await this.s3Service.deleteFolder(communityFolder);
      const deleted = await this.dbService.db
        .update(CommunitiesTable)
        .set({ imageUrl: null })
        .where(eq(CommunitiesTable.id, communityId));

      return deleted.rowCount ? deleted.rowCount > 0 : false;
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

  async setCommunityImageUrl(
    communityId: number,
    uuidOrImage: string | ImageInput
  ): Promise<boolean> {
    let imageUrl: ImageInput;

    if (typeof uuidOrImage === "string") {
      const t = Date.now();
      const uuid = uuidOrImage;
      imageUrl = {
        thumbnail: this.s3Service.getBaseUrl + `/${uuid}/thumbnail.jpg?t=${t}`,
        small: this.s3Service.getBaseUrl + `/${uuid}/small.jpg?t=${t}`,
        medium: this.s3Service.getBaseUrl + `/${uuid}/medium.jpg?t=${t}`,
        large: this.s3Service.getBaseUrl + `/${uuid}/large.jpg?t=${t}`,
      };
    } else {
      imageUrl = uuidOrImage;
    }

    const communityImageUrl = await this.dbService.db
      .update(CommunitiesTable)
      .set({
        imageUrl,
      })
      .where(eq(CommunitiesTable.id, communityId));

    return communityImageUrl.rowCount ? communityImageUrl.rowCount > 0 : false;
  }
}
