import { Test, TestingModule } from '@nestjs/testing';
import { ServiciosBienestarController } from './servicios-bienestar.controller';
import { ServiciosBienestarService } from './servicios-bienestar.service';

describe('ServiciosBienestarController', () => {
  let controller: ServiciosBienestarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiciosBienestarController],
      providers: [ServiciosBienestarService],
    }).compile();

    controller = module.get<ServiciosBienestarController>(ServiciosBienestarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
