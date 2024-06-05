import { Module } from '@nestjs/common';
import { BackendController } from './app.controller';
import { BackendService } from './app.service';

@Module({
  imports: [],
  controllers: [BackendController],
  providers: [BackendService],
})
export class BackendModule {}
