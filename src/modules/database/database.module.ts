import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Plan } from '../planes/plan.entity';
import { Especialidad } from '../especialidades/especialidad.entity';
import { Socio } from '../socios/socio.entity';
import { Entrenador } from '../staff/entrenador.entity';
import { ClaseGrupal } from '../clases/clase-grupal.entity';
import { Asistencia } from '../clases/asistencia.entity';
import { ServicioBienestar } from '../servicios-bienestar/servicio-bienestar.entity';
import { ConsumoServicio } from '../facturacion/consumo-servicio.entity';
import { Facturacion } from '../facturacion/facturacion.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host:     config.get<string>('DB_HOST'),
        port:     config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [
          Plan,
          Especialidad,
          Socio,
          Entrenador,
          ClaseGrupal,
          Asistencia,
          ServicioBienestar,
          ConsumoServicio,
          Facturacion,
        ],
        synchronize: false, 
        logging: config.get<string>('NODE_ENV') === 'development',
        timezone: 'America/Bogota',
      }),
    }),
  ],
})
export class DatabaseModule {}