import { Test, TestingModule } from '@nestjs/testing';
import { FacturationController } from './facturation.controller';

describe('FacturationController', () => {
  let controller: FacturationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacturationController],
    }).compile();

    controller = module.get<FacturationController>(FacturationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
