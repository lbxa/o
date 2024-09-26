import { Module } from "@nestjs/common";

import { DbService } from "../db/db.service";
import { ChallengesResolver } from "./challenges.resolver";
import { ChallengesService } from "./challenges.service";

@Module({
  providers: [ChallengesResolver, ChallengesService, DbService],
})
export class ChallengesModule {}
