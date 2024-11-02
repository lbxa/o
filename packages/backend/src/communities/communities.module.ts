import { Module } from "@nestjs/common";

import { ChallengesModule } from "../challenges/challenges.module";
import { DbService } from "../db/db.service";
import { UsersService } from "../users/users.service";
import { CommunitiesResolver } from "./communities.resolver";
import { CommunitiesService } from "./communities.service";

@Module({
  imports: [ChallengesModule],
  providers: [CommunitiesService, UsersService, CommunitiesResolver, DbService],
})
export class CommunitiesModule {}
