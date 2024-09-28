import { ConfigService } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DbService } from "../db/db.service";
import { ChallengesService } from "./challenges.service";

describe("ChallengesService", () => {
  let service: ChallengesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengesService, DbService, ConfigService],
    }).compile();

    service = module.get<ChallengesService>(ChallengesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
