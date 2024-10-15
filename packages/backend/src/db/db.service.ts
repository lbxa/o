import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as schema from "@o/db";
import type { MySql2Database } from "drizzle-orm/mysql2";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  public db!: MySql2Database<typeof schema>;
  private connection!: mysql.Connection;
  private readonly logger = new Logger(DbService.name);

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    try {
      this.connection = await mysql.createConnection({
        host: this.configService.getOrThrow<string>("DB_HOSTNAME"),
        user: this.configService.getOrThrow<string>("DB_USER"),
        database: this.configService.getOrThrow<string>("DB_NAME"),
        port: Number(this.configService.getOrThrow<string>("DB_PORT")),
        password: this.configService.getOrThrow<string>("DB_PASSWORD"),
        multipleStatements: false,
      });

      this.logger.log("Database connection acquired");

      this.db = drizzle(this.connection, {
        schema,
        mode: "default",
        casing: "snake_case",
      });
    } catch (error) {
      this.logger.error("Error acquiring database connection", error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.connection.end();
      this.logger.log("Database connection destroyed");
    } catch (error) {
      this.logger.error("Error destroying database connection", error);
      throw error;
    }
  }
}
