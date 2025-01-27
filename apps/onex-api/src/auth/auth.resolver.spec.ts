import { ConfigModule } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DbModule } from "../db/db.module";
import { envFile } from "../utils";
import { AuthModule } from "./auth.module";
import { AuthResolver } from "./auth.resolver";

describe("AuthResolver", () => {
  let resolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule.forRoot(() => ({
          schema: {},
        })),
        ConfigModule.forRoot({ isGlobal: true, envFilePath: envFile() }),
        AuthModule,
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
