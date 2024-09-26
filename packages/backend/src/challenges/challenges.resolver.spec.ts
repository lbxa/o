import { ConfigService } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DbService } from "../db/db.service";
import { ChallengesResolver } from "./challenges.resolver";
import { ChallengesService } from "./challenges.service";

describe("ChallengesResolver", () => {
  let resolver: ChallengesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengesResolver,
        ChallengesService,
        DbService,
        ConfigService,
      ],
    }).compile();

    resolver = module.get<ChallengesResolver>(ChallengesResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
