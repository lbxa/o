import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { MySql2Database } from "drizzle-orm/mysql2";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import * as schema from "./schema";

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  public db!: MySql2Database<typeof schema>;
  private connection!: mysql.Connection;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.connection = await mysql.createConnection({
      host: this.configService.get<string>("DB_HOSTNAME"),
      user: this.configService.get<string>("DB_USER"),
      database: this.configService.get<string>("DB_NAME"),
      port: Number(this.configService.get<string>("DB_PORT")),
      password: this.configService.get<string>("DB_PASSWORD"),
      multipleStatements: false,
    });

    this.db = drizzle(this.connection, { schema, mode: "default" });
  }

  async onModuleDestroy() {
    await this.connection.end();
  }
}
