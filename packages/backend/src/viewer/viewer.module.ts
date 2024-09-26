import { Module } from "@nestjs/common";

import { DbService } from "../db/db.service";
import { UsersService } from "../users/users.service";
import { ViewerResolver } from "./viewer.resolver";

@Module({
  providers: [ViewerResolver, UsersService, DbService],
})
export class ViewerModule {}
