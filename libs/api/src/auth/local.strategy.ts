// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { Strategy } from "passport-local";

// import { AuthService } from "./auth.service";

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy, "local") {
//   constructor(private authService: AuthService) {
//     super();
//   }

//   validate(username: string, password: string): Promise<string> {
//     // const user = await this.authService.login(username, password);
//     const user = "";
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }
