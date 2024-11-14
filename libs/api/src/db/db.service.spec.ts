import { ConfigModule } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import type * as schema from "@o/db";

import { envFile } from "../utils";
import { DbModule } from "./db.module";
import { DbService } from "./db.service";

describe("DbService", () => {
  let service: DbService<typeof schema>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule.forRoot(() => ({
          schema: {},
        })),
        ConfigModule.forRoot({ isGlobal: true, envFilePath: envFile() }),
      ],
    }).compile();

    service = module.get<DbService<typeof schema>>(DbService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
