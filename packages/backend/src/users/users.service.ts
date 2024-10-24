import { Injectable, NotFoundException } from "@nestjs/common";
import type { NewUser } from "@o/db";
import { UsersTable } from "@o/db";
import { eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { User, UserUpdateInput } from "../types/graphql";
import { encodeGlobalId } from "../utils";
import { fullTextSearch } from "./utils/full-text-search";

@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {}

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

    // const globalId = encodeGlobalId("User", result.insertId);

    return { id: result.insertedId };
  }

  async findAll(): Promise<User[]> {
    const users = await this.dbService.db.query.UsersTable.findMany();

    return users.map((user) => ({
      ...user,
      id: encodeGlobalId("User", user.id),
    }));
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.dbService.db.query.UsersTable.findFirst({
      where: eq(UsersTable.id, id),
    });

    if (!user) {
      throw new NotFoundException(`User with id ${user} not found`);
    }

    const globalId = encodeGlobalId("User", user.id);

    return { ...user, id: globalId };
  }

  // TODO replace for full text search :)
  async findByEmail(email: string): Promise<boolean> {
    const user = await this.dbService.db.query.UsersTable.findFirst({
      where: eq(UsersTable.email, email),
    });

    return !!user;
  }

  async userSearch(searchTerm: string): Promise<User[]> {
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
