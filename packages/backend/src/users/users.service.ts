import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { DbService } from "../db/db.service";
import { NewUser, User, users } from "../db/schema";
import { UserUpdateInput } from "../types/graphql";

@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {}

  async createUser(newUser: NewUser): Promise<Pick<User, "id">> {
    const { password, ...restOfUser } = newUser;
    // const passwordHash =
    //   await this.cryptoService.generatePasswordHash(password);
    const passwordHash = password; // TODO NEED TO GET THIS E2E WORKING ASAP

    const [result] = await this.dbService.db
      .insert(users)
      .values({ password: passwordHash, ...restOfUser });

    return { id: result.insertId };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.dbService.db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user[0];
  }

  async findByEmail(email: string): Promise<boolean> {
    const user = await this.dbService.db
      .select()
      .from(users)
      .where(eq(users.email, email));
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
