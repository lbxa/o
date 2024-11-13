import { Module } from "@nestjs/common";

import { UserModule } from "../user/user.module";
import { ChallengeResolver } from "./challenge.resolver";
import { ChallengeService } from "./challenge.service";
import { ChallengeActivitiesService } from "./challenge-activity";
import { ChallengeActivityResultsService } from "./challenge-activity-results";
import { ChallengeInvitationsService } from "./challenge-invitations";
import { ChallengeMembershipsService } from "./challenge-memberships";

@Module({
  imports: [UserModule],
  providers: [
    ChallengeResolver,
    ChallengeService,
    ChallengeActivitiesService,
    ChallengeActivityResultsService,
    ChallengeInvitationsService,
    ChallengeMembershipsService,
  ],
  exports: [
    ChallengeService,
    ChallengeActivitiesService,
    ChallengeActivityResultsService,
  ],
})
export class ChallengeModule {}
