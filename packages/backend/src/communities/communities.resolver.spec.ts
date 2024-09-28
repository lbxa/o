import { ConfigService } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DbService } from "../db/db.service";
import { UsersService } from "../users/users.service";
import { CommunitiesResolver } from "./communities.resolver";
import { CommunitiesService } from "./communities.service";

describe("CommunitiesResolver", () => {
  let resolver: CommunitiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        CommunitiesResolver,
        CommunitiesService,
        UsersService,
        DbService,
      ],
    }).compile();

    resolver = module.get<CommunitiesResolver>(CommunitiesResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
