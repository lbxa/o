import { ConfigModule } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DbModule } from "@/db/db.module";
import { HomeFeedModule } from "@/home-feed/home-feed.module";
import { envFile } from "@/utils";

import { HomeFeedService } from "./home-feed.service";

describe("HomeFeedService", () => {
  let service: HomeFeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule.forRoot(() => ({
          schema: {},
        })),
        ConfigModule.forRoot({ isGlobal: true, envFilePath: envFile() }),
        HomeFeedModule,
      ],
    }).compile();

    service = module.get<HomeFeedService>(HomeFeedService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
