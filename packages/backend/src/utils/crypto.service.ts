import { Injectable } from "@nestjs/common";
// TODO: Fix this.
import * as argon2 from "argon2";

@Injectable()
export class CryptoService {
  /**
   * Argon2id automatically salts. Recommended settings from:
   * https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#argon2id
   * For more documentation read: https://github.com/ranisalt/node-argon2/wiki/Options
   */
  async generateArgonHash(text: string) {
    const hash = await argon2.hash(text, {
      type: argon2.argon2id,
      parallelism: 1,
      memoryCost: 12288,
      timeCost: 3,
    });

    return hash;
  }

  async verifyArgonHash(hash: string, password: string) {
    return await argon2.verify(hash, password);
  }
}
