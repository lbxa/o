import { forwardRef, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { ChallengeModule } from "../challenge/challenge.module";
import { CommunityModule } from "../community/community.module";
import { CryptoService } from "../utils";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { UserFriendshipsService } from "./user-friendships";
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
    UserFriendshipsService,
    UserStreaksService,
    UserStreaksRepository,
    UserRecordsService,
    UserRecordsRepository,
    CryptoService,
    JwtService,
  ],
  exports: [
    UserService,
    UserFriendshipsService,
    UserStreaksService,
    UserRecordsService,
    UserRecordsRepository,
  ],
})
export class UserModule {}
