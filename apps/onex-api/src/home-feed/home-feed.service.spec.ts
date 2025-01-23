import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { HomeFeedService } from "./home-feed.service";

describe("HomeFeedService", () => {
  let service: HomeFeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeFeedService],
    }).compile();

    service = module.get<HomeFeedService>(HomeFeedService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
