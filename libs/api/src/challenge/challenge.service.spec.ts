import { ConfigModule } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DbModule } from "../db/db.module";
import { envFile } from "../utils";
import { ChallengeModule } from "./challenge.module";
import { ChallengeService } from "./challenge.service";

describe("ChallengeService", () => {
  let service: ChallengeService;

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

    service = module.get<ChallengeService>(ChallengeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
