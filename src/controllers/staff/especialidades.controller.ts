import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EspecialidadesService } from '../../services/staff/especialidades.service';
import { CreateEspecialidadDto } from '../../dto/staff/create-especialidad.dto';

@Controller('especialidades')
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}

  @Post()
  create(@Body() createEspecialidadDto: CreateEspecialidadDto) {
    return this.especialidadesService.create(createEspecialidadDto);
  }

  @Get()
  findAll() {
    return this.especialidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especialidadesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEspecialidadDto: any) {
    return this.especialidadesService.update(+id, updateEspecialidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especialidadesService.remove(+id);
  }
}
