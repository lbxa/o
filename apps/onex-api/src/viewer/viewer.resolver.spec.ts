import { ConfigModule } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ChallengeModule } from "../challenge/challenge.module";
import { CommunityModule } from "../community/community.module";
import { DbModule } from "../db/db.module";
import { UserModule } from "../user/user.module";
import { envFile } from "../utils";
import { ViewerModule } from "./viewer.module";
import { ViewerResolver } from "./viewer.resolver";

describe("ViewerResolver", () => {
  let resolver: ViewerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule.forRoot(() => ({
          schema: {},
        })),
        ConfigModule.forRoot({ isGlobal: true, envFilePath: envFile() }),
        UserModule,
        CommunityModule,
        ChallengeModule,
        ViewerModule,
      ],
    }).compile();

    resolver = module.get<ViewerResolver>(ViewerResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
