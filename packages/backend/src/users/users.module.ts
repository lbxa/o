import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { DbService } from "../db/db.service";
import { CryptoService } from "../utils";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  providers: [
    UsersResolver,
    UsersService,
    CryptoService,
    JwtService,
    DbService,
  ],
})
export class UsersModule {}
