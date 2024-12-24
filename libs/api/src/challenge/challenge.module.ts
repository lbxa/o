import { forwardRef, Module } from "@nestjs/common";

import { UserModule } from "../user/user.module";
import { ChallengeRepository } from "./challenge.repository";
import { ChallengeResolver } from "./challenge.resolver";
import { ChallengeService } from "./challenge.service";
import { ChallengeActivitiesService } from "./challenge-activity";
import {
  ChallengeActivityResultsResolver,
  ChallengeActivityResultsService,
} from "./challenge-activity-results";
import { ChallengeInvitationsService } from "./challenge-invitations";
import { ChallengeMembershipsService } from "./challenge-memberships";

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [
    ChallengeResolver,
    ChallengeActivityResultsResolver,
    ChallengeService,
    ChallengeActivitiesService,
    ChallengeActivityResultsService,
    ChallengeInvitationsService,
    ChallengeMembershipsService,
    ChallengeRepository,
  ],
  exports: [
    ChallengeService,
    ChallengeActivitiesService,
    ChallengeActivityResultsService,
  ],
})
export class ChallengeModule {}
