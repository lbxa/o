import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { eq } from "drizzle-orm";

import { db } from "../db/conn";
import { users } from "../db/schema";
import { PasswordService } from "../utils";

@Injectable()
export class AuthService {
  constructor(
    private passwordService: PasswordService,
    private jwtSecret: JwtService
  ) {}

  async signIn(email: string, hashedPassword: string) {
    const userData = await db
      .select({ id: users.id, password: users.password })
      .from(users)
      .where(eq(users.email, email));

    if (!userData[0]) {
      throw new UnauthorizedException();
    }

    const { id, password } = userData[0];

    const match = await this.passwordService.verifyPasswordHash(
      hashedPassword,
      await this.passwordService.generatePasswordHash(password) // absolute hack atm! need to fix this
    );

    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = { sub: id, email };

    return {
      access_token: await this.jwtSecret.signAsync(payload),
    };
  }
}
