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
    this.connection = await mysql.createConnection({
      host: this.configService.get<string>("DB_HOSTNAME"),
      user: this.configService.get<string>("DB_USER"),
      database: this.configService.get<string>("DB_NAME"),
      port: Number(this.configService.get<string>("DB_PORT")),
      password: this.configService.get<string>("DB_PASSWORD"),
      multipleStatements: false,
    });

    this.logger.log("Database connection acquired");

    this.db = drizzle(this.connection, { mode: "default" });
  }

  async onModuleDestroy() {
    await this.connection.end();
    this.logger.log("Database connection destroyed");
  }
}
