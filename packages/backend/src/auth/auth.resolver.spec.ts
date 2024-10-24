import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ChallengesService } from "../challenges/challenges.service";
import { DbService } from "../db/db.service";
import { UsersService } from "../users/users.service";
import { CryptoService } from "../utils";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

describe("AuthResolver", () => {
  let resolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        AuthResolver,
        AuthService,
        UsersService,
        CryptoService,
        ChallengesService,
        JwtService,
        DbService,
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
