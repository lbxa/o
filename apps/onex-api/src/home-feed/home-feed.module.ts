import { Module } from "@nestjs/common";

import { ChallengeModule } from "@/challenge/challenge.module";
import { UserModule } from "@/user/user.module";

import { HomeFeedService } from "./home-feed.service";

@Module({
  imports: [ChallengeModule, UserModule],
  providers: [HomeFeedService],
  exports: [HomeFeedService],
})
export class HomeFeedModule {}
