import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { CommunityService } from "../community/community.service";
import { CryptoService } from "../utils";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  providers: [
    UserResolver,
    UserService,
    CommunityService,
    CryptoService,
    JwtService,
  ],
  exports: [UserService],
})
export class UserModule {}
