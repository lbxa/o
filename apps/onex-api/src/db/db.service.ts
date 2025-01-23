import {
  BeforeApplicationShutdown,
  Injectable,
  Logger,
  OnModuleInit,
} from "@nestjs/common";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

@Injectable()
export class DbService<TSchema extends Record<string, unknown>>
  implements BeforeApplicationShutdown, OnModuleInit
{
  private readonly logger = new Logger(DbService.name);

  constructor(
    public readonly db: NodePgDatabase<TSchema>,
    private pool: Pool
  ) {}

  onModuleInit() {
    this.logger.log("Database connection acquired");
  }

  async destroyPool() {
    try {
      await this.pool.end();
      this.logger.log("Database connection destroyed");
    } catch (error) {
      this.logger.error("Error destroying database connection", error);
      throw error;
    }
  }

  async beforeApplicationShutdown() {
    await this.destroyPool();
  }
}
