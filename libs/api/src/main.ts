import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { GraphQLSchemaHost } from "@nestjs/graphql";
import compression from "compression";
import { writeFileSync } from "fs";
import { printSchema } from "graphql";
import helmet from "helmet";
import { join, resolve } from "path";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.use(compression());
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  const configService = app.get(ConfigService);
  const port = configService.get<number>("BACKEND_PORT") ?? 6969;

  await app.listen(port);

  /**
   * Manually write the schema file in development to avoid
   * the need for other codegen tools.
   */
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "local"
  ) {
    const gqlSchemaHost = app.get(GraphQLSchemaHost);
    // this will be running from dist package
    const projectRoot = resolve(__dirname, "..");
    const schemaPath = join(projectRoot, "schema.graphql");
    try {
      writeFileSync(schemaPath, printSchema(gqlSchemaHost.schema));
      Logger.log(`Schema file written successfully to ${schemaPath}`);
    } catch (error) {
      Logger.error("Error writing schema file:", error);
    }
  }

  Logger.log(`Server is running on port ${port}`);
}

void bootstrap();
