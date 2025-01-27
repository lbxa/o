import { forwardRef, Module } from "@nestjs/common";

import { CommunityModule } from "@/community/community.module";

import { UserModule } from "../user/user.module";
import { ChallengeRepository } from "./challenge.repository";
import { ChallengeResolver } from "./challenge.resolver";
import { ChallengeService } from "./challenge.service";
import { ChallengeActivityService } from "./challenge-activity";
import {
  ChallengeActivityResultsRepository,
  ChallengeActivityResultsResolver,
  ChallengeActivityResultsService,
} from "./challenge-activity-results";
import { RankingService } from "./challenge-activity-results/ranking-service";
import { ChallengeInvitationsService } from "./challenge-invitations";
import { ChallengeMembershipsService } from "./challenge-memberships";

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => CommunityModule)],
  providers: [
    ChallengeService,
    ChallengeResolver,
    ChallengeRepository,
    ChallengeActivityService,
    ChallengeActivityResultsResolver,
    ChallengeActivityResultsService,
    ChallengeActivityResultsRepository,
    ChallengeInvitationsService,
    ChallengeMembershipsService,
    RankingService,
  ],
  exports: [
    ChallengeService,
    ChallengeActivityService,
    ChallengeActivityResultsService,
    ChallengeActivityResultsRepository,
    RankingService,
  ],
})
export class ChallengeModule {}
