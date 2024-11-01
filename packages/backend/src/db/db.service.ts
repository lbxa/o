import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as schema from "@o/db";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  public db!: NodePgDatabase<typeof schema>;
  private connection!: Pool;
  private readonly logger = new Logger(DbService.name);

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    try {
      this.connection = new Pool({
        host: this.configService.getOrThrow<string>("DB_HOSTNAME"),
        user: this.configService.getOrThrow<string>("DB_USER"),
        database: this.configService.getOrThrow<string>("DB_NAME"),
        port: Number(this.configService.getOrThrow<string>("DB_PORT")),
        password: this.configService.getOrThrow<string>("DB_PASSWORD"),
        ssl:
          this.configService.getOrThrow<string>("DB_SSL") === "true"
            ? { rejectUnauthorized: false }
            : false,
      });

      this.logger.log("Database connection acquired");

      this.db = drizzle(this.connection, {
        schema,
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
