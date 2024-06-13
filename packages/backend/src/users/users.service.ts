import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { db } from "../db/conn";
import { users } from "../db/schema";
import { CreateUserInput, UpdateUserInput, User } from "../types/graphql";
import { PasswordService } from "../utils";

@Injectable()
export class UsersService {
  constructor(private passwordService: PasswordService) {}

  async create(createUserInput: CreateUserInput) {
    const { password, ...restOfUser } = createUserInput;

    await db.insert(users).values({ password, ...restOfUser });
    return { password, ...restOfUser };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await db.select().from(users).where(eq(users.id, id));
    return user[0];
  }

  update(updateUserInput: UpdateUserInput) {
    return {
      ...updateUserInput,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
