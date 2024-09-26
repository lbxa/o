import { UseFilters } from "@nestjs/common";
import { Query, ResolveField, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "../decorators/current-user.decorator";
import { HttpExceptionFilter } from "../error";
import { User, Viewer } from "../types/graphql";
import { UsersService } from "../users/users.service";

@Resolver("Viewer")
@UseFilters(HttpExceptionFilter)
export class ViewerResolver {
  constructor(private usersService: UsersService) {}

  @Query("viewer")
  async getViewer(
    @CurrentUser("userId") userId: number
  ): Promise<Viewer | undefined> {
    const v = {
      user: await this.usersService.findOne(userId),
    } satisfies Viewer;

    return v;
  }

  @ResolveField()
  async user(@CurrentUser("userId") userId: number): Promise<User | undefined> {
    console.log(userId);
    return this.usersService.findOne(userId);
  }
}
