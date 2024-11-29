import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { ChallengeModule } from "../challenge/challenge.module";
import { UserModule } from "../user/user.module";
import { CommunityResolver } from "./community.resolver";
import { CommunityService } from "./community.service";
import { CommunityInvitationsService } from "./community-invitations/community-invitations.service";

@Module({
  imports: [ChallengeModule, UserModule, AuthModule],
  providers: [CommunityService, CommunityResolver, CommunityInvitationsService],
  exports: [CommunityService, CommunityInvitationsService],
})
export class CommunityModule {}
