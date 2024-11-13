import { ConfigService } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DbService } from "../db/db.service";
import { ChallengeService } from "./challenge.service";

describe("ChallengeService", () => {
  let service: ChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengeService, DbService, ConfigService],
    }).compile();

    service = module.get<ChallengeService>(ChallengeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
