import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { CommunitiesResolver } from "./communities.resolver";

describe("CommunitiesResolver", () => {
  let resolver: CommunitiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunitiesResolver],
    }).compile();

    resolver = module.get<CommunitiesResolver>(CommunitiesResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
