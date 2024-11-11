import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import compression from "compression";
import helmet from "helmet";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Enable CORS
  app.use(helmet()); // Use Helmet for security
  app.use(compression()); // Enable compression
  app.setGlobalPrefix("api"); // Set a global prefix for all routes
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks(); // Graceful shutdown

  const configService = app.get(ConfigService);
  const port = configService.get<number>("BACKEND_PORT") ?? 6969;

  await app.listen(port);

  Logger.log(`Server is running on port ${port}`);
}

void bootstrap();
