import { forwardRef, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserRepository } from "@/user/user.repository";

import { ChallengeModule } from "../challenge/challenge.module";
import { CommunityModule } from "../community/community.module";
import { CryptoService } from "../utils";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { UserFriendshipService } from "./user-friendship";
import { UserRecordsRepository, UserRecordsService } from "./user-records";
import { UserStreaksRepository } from "./user-streaks/user-streaks.repository";
import { UserStreaksService } from "./user-streaks/user-streaks.service";

@Module({
  imports: [
    forwardRef(() => ChallengeModule),
    forwardRef(() => CommunityModule),
  ],
  providers: [
    UserResolver,
    UserService,
    UserFriendshipService,
    UserStreaksService,
    UserStreaksRepository,
    UserRecordsService,
    UserRecordsRepository,
    UserRepository,
    CryptoService,
    JwtService,
  ],
  exports: [
    UserService,
    UserFriendshipService,
    UserStreaksService,
    UserRecordsService,
    UserRecordsRepository,
  ],
})
export class UserModule {}
