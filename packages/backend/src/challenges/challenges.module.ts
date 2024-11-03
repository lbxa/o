import { Module } from "@nestjs/common";

import { DbService } from "../db/db.service";
import { UsersModule } from "../users/users.module";
import { ChallengeActivitiesService } from "./challenge-activity";
import { ChallengeActivityResultsService } from "./challenge-activity-results";
import { ChallengeInvitationsService } from "./challenge-invitations";
import { ChallengeMembershipsService } from "./challenge-memberships";
import { ChallengesResolver } from "./challenges.resolver";
import { ChallengesService } from "./challenges.service";

@Module({
  imports: [UsersModule],
  providers: [
    ChallengesResolver,
    ChallengesService,
    ChallengeActivitiesService,
    ChallengeActivityResultsService,
    ChallengeInvitationsService,
    ChallengeMembershipsService,
    DbService,
  ],
  exports: [ChallengesService, ChallengeActivitiesService],
})
export class ChallengesModule {}
