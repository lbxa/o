import { Module } from "@nestjs/common";

import { HomeFeedModule } from "@/home-feed";

import { AuthModule } from "../auth/auth.module";
import { ChallengeModule } from "../challenge/challenge.module";
import { CommunityModule } from "../community/community.module";
import { UserModule } from "../user/user.module";
import { ViewerResolver } from "./viewer.resolver";

@Module({
  imports: [
    ChallengeModule,
    AuthModule,
    UserModule,
    CommunityModule,
    HomeFeedModule,
  ],
  providers: [ViewerResolver],
})
export class ViewerModule {}
