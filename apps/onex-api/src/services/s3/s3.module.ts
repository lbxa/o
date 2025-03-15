import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { $C } from "@/constants";

import { S3Service } from "./s3.service";

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: $C.S3.PROVIDER_NAMES.AVATAR_S3_SERVICE,
      useFactory: (configService: ConfigService) => {
        return new S3Service(configService, $C.S3.BUCKETS.AVATAR);
      },
      inject: [ConfigService],
    },
    {
      provide: $C.S3.PROVIDER_NAMES.COMMUNITY_S3_SERVICE,
      useFactory: (configService: ConfigService) => {
        return new S3Service(configService, $C.S3.BUCKETS.COMMUNITY);
      },
      inject: [ConfigService],
    },
  ],
  exports: [
    $C.S3.PROVIDER_NAMES.AVATAR_S3_SERVICE,
    $C.S3.PROVIDER_NAMES.COMMUNITY_S3_SERVICE,
  ],
})
export class S3Module {}
