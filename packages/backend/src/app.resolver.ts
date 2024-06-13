import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class AppResolver {
  @Query()
  health(): string {
    return "All systems healthy";
  }
}
