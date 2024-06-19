import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";

import { AppResolver } from "./app.resolver";
import { AuthModule } from "./auth/auth.module";
import { DbService } from "./db/db.service";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error) => {
        const graphQLFormattedError = {
          code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
        };
        return graphQLFormattedError;
      },
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    AppResolver,
    DbService,
  ],
})
export class AppModule {}
