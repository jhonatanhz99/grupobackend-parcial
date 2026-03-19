import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EntrenadoresService } from '../../services/staff/entrenadores.service';
import { CreateEntrenadorDto } from '../../dto/staff/create-entrenador.dto';

@Controller('entrenadores')
export class EntrenadoresController {
  constructor(private readonly entrenadoresService: EntrenadoresService) {}

  @Post()
  create(@Body() createEntrenadorDto: CreateEntrenadorDto) {
    return this.entrenadoresService.create(createEntrenadorDto);
  }

  @Get()
  findAll() {
    return this.entrenadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entrenadoresService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEntrenadorDto: any) {
    return this.entrenadoresService.update(+id, updateEntrenadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entrenadoresService.remove(+id);
  }
}
