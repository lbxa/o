import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import * as schema from "@o/db";

import { AppResolver } from "./app.resolver";
import { AuthModule } from "./auth/auth.module";
import { ChallengesModule } from "./challenges/challenges.module";
import { CommunitiesModule } from "./communities/communities.module";
import { DbModule } from "./db/db.module";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { NodeResolver } from "./node.resolver";
import { DateTimeScalar } from "./types/datetime";
import { UsersModule } from "./users/users.module";
import { envFile } from "./utils";
import { ViewerModule } from "./viewer/viewer.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: envFile() }),
    DbModule.forRoot(() => ({ schema: schema })),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoTransformHttpErrors: true,
      formatError: (error) => {
        const graphQLFormattedError = {
          code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
          message: error.message,
          locations: error.locations,
          path: error.path,
        };
        return graphQLFormattedError;
      },
    }),
    AuthModule,
    UsersModule,
    CommunitiesModule,
    ChallengesModule,
    ViewerModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    DateTimeScalar,
    AppResolver,
    NodeResolver,
  ],
})
export class AppModule {}
