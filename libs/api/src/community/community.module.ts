import { Module } from "@nestjs/common";

import { ChallengesModule } from "../challenges/challenges.module";
import { UserService } from "../user/user.service";
import { CommunityResolver } from "./community.resolver";
import { CommunityService } from "./community.service";

@Module({
  imports: [ChallengesModule],
  providers: [CommunityService, UserService, CommunityResolver],
  exports: [CommunityService],
})
export class CommunityModule {}
