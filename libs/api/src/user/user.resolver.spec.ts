import { ConfigService } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { CommunityService } from "../community/community.service";
import { DbService } from "../db/db.service";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

describe("UserResolver", () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        UserResolver,
        CommunityService,
        UserService,
        DbService,
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
