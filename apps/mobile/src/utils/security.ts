import argon2 from "react-native-argon2";

/**
 * Argon2id automatically salts. Recommended settings from:
 * https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#argon2id
 * For more documentation read: https://github.com/ranisalt/node-argon2/wiki/Options
 */
export const generatePasswordHash = async (password: string) => {
  const { encodedHash } = await argon2(password, "EXAMPLE_SALT", {
    mode: "argon2id",
    parallelism: 1,
    memory: 12288,
    iterations: 3,
  });

  return encodedHash;
};
