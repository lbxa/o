import { Module } from "@nestjs/common";

import { ChallengesModule } from "../challenges/challenges.module";
import { CommunitiesService } from "../communities/communities.service";
import { DbService } from "../db/db.service";
import { UsersService } from "../users/users.service";
import { ViewerResolver } from "./viewer.resolver";

@Module({
  imports: [ChallengesModule],
  providers: [ViewerResolver, UsersService, CommunitiesService, DbService],
})
export class ViewerModule {}
