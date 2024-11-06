import { DynamicModule, Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { DbService } from "./db.service";

export interface DrizzleModuleConfig<TSchema extends Record<string, unknown>> {
  pool?: pg.Pool;
  schema: TSchema;
}

@Global()
@Module({})
export class DbModule {
  static forRoot<TSchema extends Record<string, unknown>>(
    config: () => DrizzleModuleConfig<TSchema>
  ): DynamicModule {
    return {
      imports: [ConfigModule],
      module: DbModule,
      providers: [
        {
          provide: DbService,
          useFactory: (configService: ConfigService) => {
            let { pool } = config();
            const { schema } = config();
            if (!pool) {
              pool = new pg.Pool({
                host: configService.getOrThrow<string>("DB_HOSTNAME"),
                user: configService.getOrThrow<string>("DB_USER"),
                database: configService.getOrThrow<string>("DB_NAME"),
                port: Number(configService.getOrThrow<string>("DB_PORT")),
                password: configService.getOrThrow<string>("DB_PASSWORD"),
                ssl:
                  configService.getOrThrow<string>("DB_SSL") === "true"
                    ? { rejectUnauthorized: false }
                    : false,
              });
            }
            const db = drizzle(pool, { schema, casing: "snake_case" });
            return new DbService<typeof schema>(db, pool);
          },
          inject: [ConfigService],
        },
      ],
      exports: [DbService],
    };
  }
}
