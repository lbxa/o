import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";

import { AppResolver } from "./app.resolver";
import { AuthModule } from "./auth/auth.module";
import { CommunitiesModule } from "./communities/communities.module";
import { DbService } from "./db/db.service";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { DateTimeScalar } from "./types/datetime";
import { UsersModule } from "./users/users.module";
import { ViewerModule } from "./viewer/viewer.module";

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
    CommunitiesModule,
    ViewerModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    DateTimeScalar,
    AppResolver,
    DbService,
  ],
})
export class AppModule {}
