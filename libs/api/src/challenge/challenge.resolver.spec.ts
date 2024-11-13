import { ConfigService } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DbService } from "../db/db.service";
import { ChallengeResolver } from "./challenge.resolver";
import { ChallengeService } from "./challenge.service";

describe("ChallengeResolver", () => {
  let resolver: ChallengeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengeResolver,
        ChallengeService,
        DbService,
        ConfigService,
      ],
    }).compile();

    resolver = module.get<ChallengeResolver>(ChallengeResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
