import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { ChallengeModule } from "../challenge/challenge.module";
import { CommunityService } from "../community/community.service";
import { CommunityInvitationsService } from "../community/community-invitations";
import { UserService } from "../user/user.service";
import { ViewerResolver } from "./viewer.resolver";

@Module({
  imports: [ChallengeModule, AuthModule],
  providers: [
    ViewerResolver,
    UserService,
    CommunityService,
    CommunityInvitationsService,
  ],
})
export class ViewerModule {}
