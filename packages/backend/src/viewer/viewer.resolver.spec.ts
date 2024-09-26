import { ConfigService } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DbService } from "../db/db.service";
import { UsersService } from "../users/users.service";
import { ViewerResolver } from "./viewer.resolver";

describe("ViewerResolver", () => {
  let resolver: ViewerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViewerResolver, UsersService, DbService, ConfigService],
    }).compile();

    resolver = module.get<ViewerResolver>(ViewerResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
