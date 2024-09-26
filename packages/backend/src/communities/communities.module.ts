import { Module } from "@nestjs/common";

import { DbService } from "../db/db.service";
import { CommunitiesResolver } from "./communities.resolver";
import { CommunitiesService } from "./communities.service";

@Module({
  providers: [CommunitiesService, CommunitiesResolver, DbService],
})
export class CommunitiesModule {}
