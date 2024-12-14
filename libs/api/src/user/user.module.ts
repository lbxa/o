import { forwardRef, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { ChallengeModule } from "../challenge/challenge.module";
import { CommunityModule } from "../community/community.module";
import { CryptoService } from "../utils";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { UserFriendshipsService } from "./user-friendships";

@Module({
  imports: [
    forwardRef(() => ChallengeModule),
    forwardRef(() => CommunityModule),
  ],
  providers: [
    UserResolver,
    UserService,
    UserFriendshipsService,
    CryptoService,
    JwtService,
  ],
  exports: [UserService, UserFriendshipsService],
})
export class UserModule {}
