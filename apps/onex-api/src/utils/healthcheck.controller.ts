import { Controller, Get } from "@nestjs/common";

import { Public } from "@/decorators";

@Controller("health")
export class HealthCheckController {
  @Public()
  @Get("/")
  root() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }

  @Public()
  @Get("/health")
  health() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
