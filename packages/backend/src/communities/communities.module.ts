import { Module } from "@nestjs/common";

import { ChallengesModule } from "../challenges/challenges.module";
import { UsersService } from "../users/users.service";
import { CommunitiesResolver } from "./communities.resolver";
import { CommunitiesService } from "./communities.service";

@Module({
  imports: [ChallengesModule],
  providers: [CommunitiesService, UsersService, CommunitiesResolver],
  exports: [CommunitiesService],
})
export class CommunitiesModule {}
