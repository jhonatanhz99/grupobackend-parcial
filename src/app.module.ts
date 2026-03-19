import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacturacionModule } from './modules/facturacion/facturacion.module';

@Module({
  imports: [FacturacionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
