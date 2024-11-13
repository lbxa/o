import { ConfigService } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ChallengeModule } from "../challenge/challenge.module";
import { CommunityModule } from "../community/community.module";
import { DbService } from "../db/db.service";
import { UserModule } from "../user/user.module";
import { ViewerResolver } from "./viewer.resolver";

describe("ViewerResolver", () => {
  let resolver: ViewerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, CommunityModule, ChallengeModule],
      providers: [ViewerResolver, DbService, ConfigService],
    }).compile();

    resolver = module.get<ViewerResolver>(ViewerResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
