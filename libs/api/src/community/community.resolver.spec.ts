import { ConfigModule } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DbModule } from "../db/db.module";
import { envFile } from "../utils";
import { CommunityModule } from "./community.module";
import { CommunityResolver } from "./community.resolver";

describe("CommunityResolver", () => {
  let resolver: CommunityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule.forRoot(() => ({
          schema: {},
        })),
        ConfigModule.forRoot({ isGlobal: true, envFilePath: envFile() }),
        CommunityModule,
      ],
    }).compile();

    resolver = module.get<CommunityResolver>(CommunityResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
