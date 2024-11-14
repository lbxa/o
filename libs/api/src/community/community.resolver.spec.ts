import { ConfigService } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ChallengeService } from "../challenge/challenge.service";
import { DbService } from "../db/db.service";
import { UserService } from "../user/user.service";
import { CommunityResolver } from "./community.resolver";
import { CommunityService } from "./community.service";

describe("CommunityResolver", () => {
  let resolver: CommunityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        CommunityResolver,
        CommunityService,
        ChallengeService,
        UserService,
        DbService,
      ],
    }).compile();

    resolver = module.get<CommunityResolver>(CommunityResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});