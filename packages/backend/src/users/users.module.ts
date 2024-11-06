import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { CommunitiesService } from "../communities/communities.service";
import { CryptoService } from "../utils";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  providers: [
    UsersResolver,
    UsersService,
    CommunitiesService,
    CryptoService,
    JwtService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
