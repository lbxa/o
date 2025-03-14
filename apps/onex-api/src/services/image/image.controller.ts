import {
  BadRequestException,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { CurrentUserHttp } from "@/decorators";
import {
  COMMON_IMAGE_RESOLUTIONS,
  ImageType,
  MultiSizedImageResult,
} from "@/services/image/image.types";
import { validateAndDecodeGlobalId } from "@/utils";

import { AvatarImageService } from "./avatar-image.service";
import { CommunityImageService } from "./community-image.service";

@Controller("image")
export class ImageController {
  constructor(
    private readonly avatarImageService: AvatarImageService,
    private readonly communityImageService: CommunityImageService
  ) {}

  /**
   * Upload an avatar image
   * @param file - The image file
   * @returns The uploaded image details in multiple resolutions
   */
  @Post("avatar/upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadAvatarImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: "image/jpeg" }),
          // new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
        ],
      })
    )
    file: Express.Multer.File,
    @CurrentUserHttp("userId") userId: number
  ): Promise<MultiSizedImageResult> {
    if (!file) {
      throw new BadRequestException("File is required");
    }

    return this.avatarImageService.uploadAvatarImage(
      file.buffer,
      file.mimetype,
      userId
    );
  }

  /**
   * Upload a community image
   * @param file - The image file
   * @param communityId - The community ID
   * @returns The uploaded image details
   */
  @Post("community/:communityId/upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadCommunityImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: "image/jpeg" }),
          // new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
        ],
      })
    )
    file: Express.Multer.File,
    @Param("communityId") communityId: string
  ): Promise<MultiSizedImageResult> {
    if (!file) {
      throw new BadRequestException("File is required");
    }

    const decodedCommunityId = validateAndDecodeGlobalId(
      communityId,
      "Community"
    );

    return this.communityImageService.uploadCommunityImage(
      file.buffer,
      file.mimetype,
      decodedCommunityId
    );
  }

  /**
   * Delete an avatar image. Only the user can delete their own avatar image.
   * @returns Success status
   */
  @Delete("avatar")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAvatarImage(
    @CurrentUserHttp("userId") userId: number
  ): Promise<void> {
    await this.avatarImageService.deleteAvatarImage(userId);
  }

  /**
   * Delete a community image
   * @param communityId - The community ID
   * @returns Success status
   */
  @Delete("community/:communityId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCommunityImage(
    @Param("communityId") communityId: string
  ): Promise<void> {
    const decodedCommunityId = validateAndDecodeGlobalId(
      communityId,
      "Community"
    );
    await this.communityImageService.deleteCommunityImage(decodedCommunityId);
  }

  /**
   * Get the public URL for a specific resolution of an avatar image
   * @param resolution - The resolution to get (low, med, high, or original)
   * @returns The public URL
   */
  @Get("avatar/resolution/:res")
  getAvatarResolutionUrl(
    @CurrentUserHttp("userId") userId: number,
    @Param("res") resolution: ImageType
  ): { url: string } {
    if (!Object.keys(COMMON_IMAGE_RESOLUTIONS).includes(resolution)) {
      throw new BadRequestException(
        "Invalid resolution. Valid resolutions are: low, med, high, or original"
      );
    }

    const url = this.avatarImageService.getAvatarResolutionUrl(
      userId,
      resolution
    );
    return { url };
  }

  /**
   * Get the public URL for a community image
   * @param communityId - The community ID
   * @returns The public URL
   */
  @Get("community/:communityId/:res")
  getCommunityImageUrl(
    @Param("communityId") communityId: number,
    @Param("res") resolution: ImageType
  ): { url: string } {
    const url = this.communityImageService.getCommunityImageUrl(
      communityId,
      resolution
    );
    return { url };
  }
}
