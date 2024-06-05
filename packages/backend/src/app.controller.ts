import { Controller, Get } from '@nestjs/common';
import type { BackendService } from './app.service';

@Controller()
export class BackendController {
  constructor(private readonly backendService: BackendService) {}

  @Get()
  getHello(): string {
    return this.backendService.getHello();
  }
}
