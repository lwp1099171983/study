import { Test, TestingModule } from '@nestjs/testing';
import { UniqueCodeController } from './unique-code.controller';
import { UniqueCodeService } from './unique-code.service';

describe('UniqueCodeController', () => {
  let controller: UniqueCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniqueCodeController],
      providers: [UniqueCodeService],
    }).compile();

    controller = module.get<UniqueCodeController>(UniqueCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
