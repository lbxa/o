import { Module } from "@nestjs/common";

import { ChallengesService } from "../challenges/challenges.service";
import { CommunitiesService } from "../communities/communities.service";
import { DbService } from "../db/db.service";
import { UsersService } from "../users/users.service";
import { ViewerResolver } from "./viewer.resolver";

@Module({
  providers: [
    ViewerResolver,
    UsersService,
    CommunitiesService,
    ChallengesService,
    DbService,
  ],
})
export class ViewerModule {}
