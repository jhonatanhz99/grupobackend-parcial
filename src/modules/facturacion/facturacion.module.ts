import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacturacionController } from './facturacion.controller';
import { FacturacionService } from './facturacion.service';
import { Facturacion } from './facturacion.entity';
import { ConsumoServicio } from './consumo-servicio.entity';

// Entidades de otros módulos que necesita el servicio
import { Socio } from '../socios/socio.entity';
import { ServicioBienestar } from '../servicios-bienestar/servicio-bienestar.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Facturacion,
      ConsumoServicio,
      Socio,           // Para validar socios y obtener su plan
      ServicioBienestar, // Para obtener precio actual del servicio
    ]),
  ],
  controllers: [FacturacionController],
  providers: [FacturacionService],
  exports: [FacturacionService], // Exportar por si otro módulo lo necesita
})
export class FacturacionModule {}
