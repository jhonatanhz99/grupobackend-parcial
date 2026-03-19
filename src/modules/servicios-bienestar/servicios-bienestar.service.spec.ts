import { Test, TestingModule } from '@nestjs/testing';
import { ServiciosBienestarService } from './servicios-bienestar.service';

describe('ServiciosBienestarService', () => {
  let service: ServiciosBienestarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiciosBienestarService],
    }).compile();

    service = module.get<ServiciosBienestarService>(ServiciosBienestarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
