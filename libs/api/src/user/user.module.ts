import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { CommunityService } from "../community/community.service";
import { CryptoService } from "../utils";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { UserFriendshipsService } from "./user-friendships";

@Module({
  providers: [
    UserResolver,
    UserService,
    UserFriendshipsService,
    CommunityService,
    CryptoService,
    JwtService,
  ],
  exports: [UserService, UserFriendshipsService],
})
export class UserModule {}
