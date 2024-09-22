import { Module } from "@nestjs/common";

import { DbService } from "../db/db.service";
import { UsersService } from "../users/users.service";
import { CommunitiesResolver } from "./communities.resolver";
import { CommunitiesService } from "./communities.service";

@Module({
  providers: [CommunitiesService, UsersService, CommunitiesResolver, DbService],
})
export class CommunitiesModule {}
