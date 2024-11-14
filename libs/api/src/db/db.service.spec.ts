import { ConfigService } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import type * as schema from "@o/db";

import { DbService } from "./db.service";

describe("DbService", () => {
  let service: DbService<typeof schema>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, DbService],
    }).compile();

    service = module.get<DbService<typeof schema>>(DbService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
