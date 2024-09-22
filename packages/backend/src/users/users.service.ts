import { Injectable } from "@nestjs/common";
import type { NewUser } from "@o/db";
import { UsersTable } from "@o/db";
import { eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { User, UserUpdateInput } from "../types/graphql";
import { encodeGlobalId } from "../utils";

@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {}

  async createUser(newUser: NewUser): Promise<Pick<NewUser, "id">> {
    const { password, ...restOfUser } = newUser;
    // const passwordHash =
    //   await this.cryptoService.generatePasswordHash(password);
    const passwordHash = password; // TODO NEED TO GET THIS E2E WORKING ASAP

    const [result] = await this.dbService.db
      .insert(UsersTable)
      .values({ password: passwordHash, ...restOfUser });

    // const globalId = encodeGlobalId("User", result.insertId);

    return { id: result.insertId };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number): Promise<User | undefined> {
    const [user] = await this.dbService.db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.id, id));

    const globalId = encodeGlobalId("User", user.id);

    return { ...user, id: globalId };
  }

  async findByEmail(email: string): Promise<boolean> {
    const user = await this.dbService.db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.email, email));
    return user.length > 0;
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
