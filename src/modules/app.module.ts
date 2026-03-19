import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';

import { EspecialidadesModule } from './staff/especialidades.module';
import { EntrenadoresModule } from './staff/entrenadores.module';
import { ClasesGrupalesModule } from './clases-grupales.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // WARNING: Set to false in production
    }),
    EspecialidadesModule,
    EntrenadoresModule,
    ClasesGrupalesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
