import { Module } from "@nestjs/common";

import { ChallengeModule } from "../challenge/challenge.module";
import { UserService } from "../user/user.service";
import { CommunityResolver } from "./community.resolver";
import { CommunityService } from "./community.service";

@Module({
  imports: [ChallengeModule],
  providers: [CommunityService, UserService, CommunityResolver],
  exports: [CommunityService],
})
export class CommunityModule {}
