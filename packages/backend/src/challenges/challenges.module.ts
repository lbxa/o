import { Module } from "@nestjs/common";

import { DbService } from "../db/db.service";
import { UsersModule } from "../users/users.module";
import { ChallengeActivitiesService } from "./challenge-activity";
import { ChallengeActivityResultsService } from "./challenge-results";
import { ChallengesResolver } from "./challenges.resolver";
import { ChallengesService } from "./challenges.service";

@Module({
  imports: [UsersModule],
  providers: [
    ChallengesResolver,
    ChallengesService,
    ChallengeActivitiesService,
    ChallengeActivityResultsService,
    DbService,
  ],
  exports: [ChallengesService, ChallengeActivitiesService],
})
export class ChallengesModule {}
