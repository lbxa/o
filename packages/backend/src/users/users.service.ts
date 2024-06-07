import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from '../types/graphql';
import { db } from '../db/conn';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  async create(createUserInput: CreateUserInput) {
    await db.insert(users).values(createUserInput);
    return createUserInput;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await db.select().from(users).where(eq(users.id, id));
    return user[0];
  }

  update(updateUserInput: UpdateUserInput) {
    return {
      ...updateUserInput
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
