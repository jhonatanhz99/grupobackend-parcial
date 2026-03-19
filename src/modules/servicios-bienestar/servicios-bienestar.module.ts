import { Module } from '@nestjs/common';
import { ServiciosBienestarService } from './servicios-bienestar.service';
import { ServiciosBienestarController } from './servicios-bienestar.controller';

@Module({
  controllers: [ServiciosBienestarController],
  providers: [ServiciosBienestarService],
})
export class ServiciosBienestarModule {}
