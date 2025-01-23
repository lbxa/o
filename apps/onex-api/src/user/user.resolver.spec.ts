import { ConfigModule } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DbModule } from "../db/db.module";
import { envFile } from "../utils";
import { UserModule } from "./user.module";
import { UserResolver } from "./user.resolver";

describe("UserResolver", () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule.forRoot(() => ({
          schema: {},
        })),
        ConfigModule.forRoot({ isGlobal: true, envFilePath: envFile() }),
        UserModule,
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
