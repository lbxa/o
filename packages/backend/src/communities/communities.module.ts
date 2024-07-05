import { Module } from "@nestjs/common";

import { DbService } from "../db/db.service";
import { CommunitiesResolver } from "./communities.resolver";

@Module({
  providers: [CommunitiesResolver, DbService],
})
export class CommunitiesModule {}
