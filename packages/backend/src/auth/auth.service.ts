import { Injectable } from "@nestjs/common";
import { PasswordService } from "../utils";
import { db } from "../db/conn";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";

@Injectable()
export class AuthService {
  constructor(private passwordService: PasswordService) {}

  async signIn(email: string, hashedPassword: string) {
    const userData = await db
      .select({ password: users.password })
      .from(users)
      .where(eq(users.email, email));

    if (!userData[0]) {
      return false;
    }
    const userPassword = userData[0].password;

    const match = await this.passwordService.verifyPasswordHash(
      hashedPassword,
      userPassword
    );

    if (match) {
      // return jwt refresh token
    }

    return false;
  }
}
