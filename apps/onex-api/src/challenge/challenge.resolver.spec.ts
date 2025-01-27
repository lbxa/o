import { ConfigModule } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DbModule } from "../db/db.module";
import { envFile } from "../utils";
import { ChallengeModule } from "./challenge.module";
import { ChallengeResolver } from "./challenge.resolver";

describe("ChallengeResolver", () => {
  let resolver: ChallengeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule.forRoot(() => ({
          schema: {},
        })),
        ConfigModule.forRoot({ isGlobal: true, envFilePath: envFile() }),
        ChallengeModule,
      ],
    }).compile();

    resolver = module.get<ChallengeResolver>(ChallengeResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
