import { Module } from "@nestjs/common";

import { HomeFeedService } from "./home-feed.service";

@Module({
  providers: [HomeFeedService],
})
export class HomeFeedModule {}
