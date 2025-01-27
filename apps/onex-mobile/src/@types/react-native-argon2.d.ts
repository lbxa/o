// // react-native-argon2.d.ts
// declare module "react-native-argon2" {
//   interface ArgonConfig {
//     iterations?: number;
//     memory?: number;
//     parallelism?: number;
//     hashLength?: number;
//     mode?: "argon2i" | "argon2id" | "argon2d";
//   }

//   interface ArgonResult {
//     rawHash: string;
//     encodedHash: string;
//   }

//   function argon2(
//     password: string,
//     salt: string,
//     config?: ArgonConfig
//   ): Promise<ArgonResult>;

//   export default argon2;
// }
