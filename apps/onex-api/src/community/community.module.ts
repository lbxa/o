import { forwardRef, Module } from "@nestjs/common";

import { CommunityRepository } from "@/community/community.repository";
import { ImageModule } from "@/services/image/image.module";

import { AuthModule } from "../auth/auth.module";
import { ChallengeModule } from "../challenge/challenge.module";
import { UserModule } from "../user/user.module";
import { CommunityResolver } from "./community.resolver";
import { CommunityService } from "./community.service";
import { CommunityInvitationsService } from "./community-invitations/community-invitations.service";
import { CommunityMembershipsService } from "./community-memberships/community-memberships.service";

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => ChallengeModule),
    forwardRef(() => AuthModule),
    ImageModule,
  ],
  providers: [
    CommunityService,
    CommunityResolver,
    CommunityInvitationsService,
    CommunityMembershipsService,
    CommunityRepository,
  ],
  exports: [
    CommunityService,
    CommunityInvitationsService,
    CommunityMembershipsService,
    CommunityRepository,
  ],
})
export class CommunityModule {}
