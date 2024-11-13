import { Injectable, NotFoundException } from "@nestjs/common";
import type { NewUser, User as PgUser } from "@o/db";
import { UsersTable } from "@o/db";
import * as schema from "@o/db";
import { eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { EntityService } from "../entity";
import { User as GqlUser, UserUpdateInput } from "../types/graphql";
import { CryptoService, encodeGlobalId } from "../utils";
import { fullTextSearch } from "./utils/full-text-search";

@Injectable()
export class UserService
  implements EntityService<typeof UsersTable, PgUser, GqlUser>
{
  constructor(
    private dbService: DbService<typeof schema>,
    private cryptoService: CryptoService
  ) {}

  public getTypename(): string {
    return "User";
  }

  public pg2GqlMapper(pgUser: PgUser): GqlUser {
    return {
      ...pgUser,
      id: encodeGlobalId("User", pgUser.id),
    };
  }

  async create(newUser: NewUser): Promise<PgUser> {
    const { password, ...restOfUser } = newUser;
    const passwordHash = await this.cryptoService.generateArgonHash(password);

    const [result] = await this.dbService.db
      .insert(UsersTable)
      .values({
        ...restOfUser,
        password: passwordHash,
      })
      .returning();

    return result;
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

  async findByEmail(email: string): Promise<PgUser | undefined> {
    return this.dbService.db.query.UsersTable.findFirst({
      where: eq(UsersTable.email, email),
    });
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
