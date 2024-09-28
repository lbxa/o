import { ConfigService } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { CommunitiesService } from "../communities/communities.service";
import { DbService } from "../db/db.service";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

describe("UsersResolver", () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        UsersResolver,
        CommunitiesService,
        UsersService,
        DbService,
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
