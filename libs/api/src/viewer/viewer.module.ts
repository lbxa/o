import { Module } from "@nestjs/common";

import { ChallengeModule } from "../challenge/challenge.module";
import { CommunityService } from "../community/community.service";
import { UserService } from "../user/user.service";
import { ViewerResolver } from "./viewer.resolver";

@Module({
  imports: [ChallengeModule],
  providers: [ViewerResolver, UserService, CommunityService],
})
export class ViewerModule {}
