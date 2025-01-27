import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import compression from "compression";
import helmet from "helmet";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === "production" ? undefined : false,
    })
  );
  app.use(compression());
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  const configService = app.get(ConfigService);
  const port = configService.get<number>("BACKEND_PORT") ?? 6969;

  await app.listen(port);

  // writeSchema(app); had to switch this off -- conflicting schemas

  Logger.log(`Server is running on port ${port}`);
}

void bootstrap();
