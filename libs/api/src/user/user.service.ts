import { Injectable } from "@nestjs/common";
import type { NewUser, User as PgUser } from "@o/db";
import { UsersTable } from "@o/db";
import * as schema from "@o/db";
import { eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { EntityService, EntityType } from "../entity";
import { User as GqlUser, UserUpdateInput } from "../types/graphql";
import {
  CryptoService,
  encodeGlobalId,
  validateAndDecodeGlobalId,
} from "../utils";
import { NotFoundError } from "../utils/errors";
import { fullTextSearch } from "./utils/full-text-search.pg";

@Injectable()
export class UserService
  implements EntityService<typeof UsersTable, PgUser, GqlUser>
{
  constructor(
    private dbService: DbService<typeof schema>,
    private cryptoService: CryptoService
  ) {}

  public getTypename(): EntityType {
    return "User";
  }

  public pg2GqlMapper(pgUser: PgUser): GqlUser {
    return {
      ...pgUser,
      id: encodeGlobalId(this.getTypename(), pgUser.id),
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
      throw new NotFoundError(`User with id ${id} not found`);
    }

    return this.pg2GqlMapper(user);
  }

  async findByEmail(email: string): Promise<PgUser | undefined> {
    return this.dbService.db.query.UsersTable.findFirst({
      where: eq(UsersTable.email, email),
    });
  }

  async userSearch(searchTerm: string): Promise<GqlUser[]> {
    const results = await fullTextSearch(this.dbService, searchTerm);
    return results.map((result) => this.pg2GqlMapper(result));
  }

  async update(updateUserInput: UserUpdateInput): Promise<GqlUser> {
    const { id: globalId, ...updates } = updateUserInput;
    const id = validateAndDecodeGlobalId(globalId, this.getTypename());

    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== null)
    );

    const [updatedUser] = await this.dbService.db
      .update(UsersTable)
      .set(filteredUpdates)
      .where(eq(UsersTable.id, id))
      .returning();

    if (!updatedUser) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    return this.pg2GqlMapper(updatedUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
