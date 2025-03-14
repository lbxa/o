import { Module } from "@nestjs/common";

import { S3Module } from "../s3/s3.module";
import { AvatarImageService } from "./avatar-image.service";
import { CommunityImageService } from "./community-image.service";
import { ImageController } from "./image.controller";
import { SharedImageService } from "./shared-image.service";

@Module({
  imports: [S3Module],
  controllers: [ImageController],
  providers: [AvatarImageService, CommunityImageService, SharedImageService],
  exports: [AvatarImageService, CommunityImageService, SharedImageService],
})
export class ImageModule {}
