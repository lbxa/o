import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { BackendController } from './app.controller';
import { BackendService } from './app.service';

describe('BackendController', () => {
  let backendController: BackendController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BackendController],
      providers: [BackendService],
    }).compile();

    backendController = app.get<BackendController>(BackendController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(backendController.getHello()).toBe('Hello World!');
    });
  });
});
