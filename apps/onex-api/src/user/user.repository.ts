import { Injectable } from "@nestjs/common";
import type {
  $DrizzleSchema,
  NewUser as PgNewUser,
  User as PgUser,
} from "@o/db";
import { UsersTable } from "@o/db";
import { eq, inArray } from "drizzle-orm";

import { DbService } from "../db/db.service";
import {
  EntityRepository,
  FindByArgs,
  SearchableNumericFields,
} from "../entity";
import { fullTextSearch } from "./utils/full-text-search.pg";

@Injectable()
export class UserRepository
  implements EntityRepository<typeof UsersTable, PgUser, PgNewUser, PgUser>
{
  constructor(private dbService: DbService<typeof $DrizzleSchema>) {}

  async create(newUser: PgNewUser): Promise<PgUser | undefined> {
    const [result] = await this.dbService.db
      .insert(UsersTable)
      .values(newUser)
      .returning();

    return result;
  }

  async update(
    updateUserInput: Partial<PgUser> & { id: number }
  ): Promise<PgUser | undefined> {
    const [updatedUser] = await this.dbService.db
      .update(UsersTable)
      .set(updateUserInput)
      .where(eq(UsersTable.id, updateUserInput.id))
      .returning();

    return updatedUser;
  }

  async delete(id: number): Promise<boolean> {
    const [deletedUser] = await this.dbService.db
      .delete(UsersTable)
      .where(eq(UsersTable.id, id))
      .returning();

    return !!deletedUser;
  }

  async findBy(
    fields: SearchableNumericFields<PgUser, "id"> = {},
    args?: FindByArgs
  ): Promise<PgUser[]> {
    const users = await this.dbService.db.query.UsersTable.findMany({
      where: Object.keys(fields).length
        ? (users, { and, eq }) =>
            and(
              ...Object.entries(fields).map(([k, v]) =>
                Array.isArray(v)
                  ? inArray(users[k as keyof typeof users], v)
                  : eq(users[k as keyof typeof users], v)
              )
            )
        : undefined,
      limit: args?.limit,
      offset: args?.offset,
    });

    return users;
  }

  async findById(id: number): Promise<PgUser | undefined> {
    const [user] = await this.findBy({ id });

    if (!user) {
      return undefined;
    }

    return user;
  }

  async findByEmail(email: string): Promise<PgUser | undefined> {
    const user = await this.dbService.db.query.UsersTable.findFirst({
      where: eq(UsersTable.email, email),
    });

    return user;
  }

  async findAll(): Promise<PgUser[]> {
    return await this.findBy({});
  }

  async userSearch(searchTerm: string): Promise<PgUser[]> {
    return fullTextSearch(this.dbService, searchTerm);
  }
}
