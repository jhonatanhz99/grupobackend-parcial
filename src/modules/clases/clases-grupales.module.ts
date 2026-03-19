import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseGrupal } from '../../entities/clases/clase-grupal.entity';
import { ClasesService } from '../../services/clases.service';
import { ClasesController } from '../../controllers/clases.controller';
import { StaffModule } from '../staff/staff.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClaseGrupal]),
    StaffModule,
  ],
  providers: [ClasesService],
  controllers: [ClasesController],
  exports: [ClasesService],
})
export class ClasesGrupalesModule { }
