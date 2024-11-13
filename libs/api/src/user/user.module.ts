import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { CommunitiesService } from "../communities/communities.service";
import { CryptoService } from "../utils";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  providers: [
    UserResolver,
    UserService,
    CommunitiesService,
    CryptoService,
    JwtService,
  ],
  exports: [UserService],
})
export class UserModule {}
