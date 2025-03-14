/* eslint-disable @stylistic/js/max-len */
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import sharp from "sharp";

import { ErrorWithMessage } from "@/utils";

import {
  COMMON_IMAGE_RESOLUTIONS,
  ImageType,
  ImageUploader,
  MultiSizedImageResult,
} from "./image.types";

@Injectable()
export class SharedImageService {
  private readonly logger = new Logger(SharedImageService.name);
  private readonly resolutions = { ...COMMON_IMAGE_RESOLUTIONS };

  /**
   * Generate and upload resized versions of an image
   * @param file - The original image buffer
   * @param mimeType - The MIME type of the image
   * @param entityKey - The key of the entity (user, community, etc.)
   * @param uploader - The service that will handle the actual upload
   * @returns Promise with the uploaded resized images URLs
   */
  async uploadResizedImages({
    file,
    mimeType,
    entityKey,
    uploader,
  }: {
    file: Buffer;
    mimeType: string;
    entityKey: string;
    uploader: ImageUploader;
  }): Promise<MultiSizedImageResult> {
    if (file.length === 0) {
      throw new BadRequestException("File is required");
    }

    try {
      const entityFolder = `${entityKey}`;
      const results: Record<string, string> = {};

      // Upload original image
      const originalResult = await uploader.uploadFile({
        fileBuffer: file,
        filename: "original",
        folder: entityFolder,
        mimeType,
      });

      // Skip resizing for SVG files
      if (mimeType === "image/svg+xml") {
        // For SVGs, just use the original file for all resolutions
        for (const prefix of Object.keys(this.resolutions)) {
          const result = await uploader.uploadFile({
            fileBuffer: file,
            filename: prefix,
            folder: entityFolder,
            mimeType,
          });
          results[prefix] = result.url;
        }
      } else {
        // Process each resolution in parallel
        const resizePromises = Object.entries(this.resolutions).map(
          async ([type, [width, height]]) => {
            try {
              // Resize the image
              const resizedBuffer = await sharp(file)
                .resize(width, height, {
                  fit: "cover",
                  position: "center",
                })
                .toBuffer();

              // Upload the resized image
              const result = await uploader.uploadFile({
                fileBuffer: resizedBuffer,
                filename: type,
                folder: entityFolder,
                mimeType,
              });

              results[type] = result.url;
            } catch (error) {
              const err = error as ErrorWithMessage;
              this.logger.error(
                `Failed to resize image to ${width}x${height}px: ${err.message}`,
                err.stack
              );
              const msg = `Resize failed for ${width}x${height}px: `;
              throw new Error(`${msg}${err.message}`);
            }
          }
        );

        await Promise.all(resizePromises);
      }

      return {
        key: entityFolder,
        original: originalResult.url,
        thumbnail: results.thumbnail,
        small: results.small,
        medium: results.medium,
        large: results.large,
      };
    } catch (error) {
      const err = error as ErrorWithMessage;
      this.logger.error(`Failed to upload image: ${err.message}`, err.stack);
      throw new BadRequestException(`Failed to upload image: ${err.message}`);
    }
  }

  /**
   * Get the URLs for all resolutions of an entity's image
   * @param entityId - The entity ID
   * @param baseUrl - The base URL for the S3 bucket
   * @returns Object with URLs for all resolutions
   */
  getImageUrls(entityId: number, baseUrl: string): MultiSizedImageResult {
    if (!entityId) {
      throw new BadRequestException("Entity ID is required");
    }

    const entityFolder = `${entityId}`;
    const t = Date.now(); // Cache busting parameter

    return {
      key: entityFolder,
      original: `${baseUrl}/${entityFolder}/original.jpg?t=${t}`,
      thumbnail: `${baseUrl}/${entityFolder}/thumbnail.jpg?t=${t}`,
      small: `${baseUrl}/${entityFolder}/small.jpg?t=${t}`,
      medium: `${baseUrl}/${entityFolder}/medium.jpg?t=${t}`,
      large: `${baseUrl}/${entityFolder}/large.jpg?t=${t}`,
    };
  }

  /**
   * Get a specific resolution URL for an entity's image
   * @param entityId - The entity ID
   * @param resolution - The resolution to get
   * @param baseUrl - The base URL for the S3 bucket
   * @returns The URL for the requested resolution
   */
  getImageResolutionUrl(
    entityId: number,
    resolution: ImageType,
    baseUrl: string
  ): string {
    if (!entityId) {
      throw new BadRequestException("Entity ID is required");
    }

    const t = Date.now(); // Cache busting parameter
    return `${baseUrl}/${entityId}/${resolution}.jpg?t=${t}`;
  }
}
