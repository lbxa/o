import { Query, Resolver } from "@nestjs/graphql";

import { Public } from "./decorators";

@Resolver()
export class AppResolver {
  @Public()
  @Query("health")
  health(): string {
    return "All systems healthy";
  }
}
