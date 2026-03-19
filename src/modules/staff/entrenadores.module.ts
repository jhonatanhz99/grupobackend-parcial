import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntrenadoresService } from '../../services/staff/entrenadores.service';
import { EntrenadoresController } from '../../controllers/staff/entrenadores.controller';
import { Entrenador } from '../../entities/staff/entrenador.entity';
import { Especialidad } from '../../entities/staff/especialidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entrenador, Especialidad])],
  controllers: [EntrenadoresController],
  providers: [EntrenadoresService],
  exports: [EntrenadoresService],
})
export class EntrenadoresModule { }
