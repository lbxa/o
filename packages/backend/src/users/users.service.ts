import { Injectable, NotFoundException } from "@nestjs/common";
import type { NewUser, User as PgUser } from "@o/db";
import { UsersTable } from "@o/db";
import * as schema from "@o/db";
import { eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { EntityService } from "../entity";
import { User as GqlUser, UserUpdateInput } from "../types/graphql";
import { encodeGlobalId } from "../utils";
import { fullTextSearch } from "./utils/full-text-search";

@Injectable()
export class UsersService
  implements EntityService<typeof UsersTable, PgUser, GqlUser>
{
  constructor(private dbService: DbService<typeof schema>) {}

  public getTypename(): string {
    return "User";
  }

  public pg2GqlMapper(pgUser: PgUser): GqlUser {
    return {
      ...pgUser,
      id: encodeGlobalId("User", pgUser.id),
    };
  }

  async createUser(
    newUser: Omit<NewUser, "fullName">
  ): Promise<Pick<NewUser, "id">> {
    const { password, ...restOfUser } = newUser;
    // const passwordHash =
    //   await this.cryptoService.generatePasswordHash(password);
    const passwordHash = password; // TODO NEED TO GET THIS E2E WORKING ASAP

    const [result] = await this.dbService.db
      .insert(UsersTable)
      .values({
        ...restOfUser,
        password: passwordHash,
        fullName: restOfUser.firstName + " " + restOfUser.lastName,
      })
      .returning({ insertedId: UsersTable.id });

    return { id: result.insertedId };
  }

  async findAll(): Promise<GqlUser[]> {
    const users = await this.dbService.db.query.UsersTable.findMany();
    return users.map((user) => this.pg2GqlMapper(user));
  }

  async findById(id: number): Promise<GqlUser | undefined> {
    const user = await this.dbService.db.query.UsersTable.findFirst({
      where: eq(UsersTable.id, id),
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.pg2GqlMapper(user);
  }

  // TODO replace for full text search :)
  async findByEmail(email: string): Promise<boolean> {
    const user = await this.dbService.db.query.UsersTable.findFirst({
      where: eq(UsersTable.email, email),
    });

    return !!user;
  }

  async userSearch(searchTerm: string): Promise<GqlUser[]> {
    return await fullTextSearch(this.dbService, searchTerm);
  }

  update(updateUserInput: UserUpdateInput) {
    return {
      ...updateUserInput,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
