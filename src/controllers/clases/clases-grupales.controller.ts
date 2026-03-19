import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ClasesGrupalesService } from '../../services/clases/clases-grupales.service';
import { CreateClaseGrupalDto } from '../../dto/clases/create-clase-grupal.dto';

@Controller('clases-grupales')
export class ClasesGrupalesController {
  constructor(private readonly clasesGrupalesService: ClasesGrupalesService) {}

  @Post()
  create(@Body() createClaseGrupalDto: CreateClaseGrupalDto) {
    return this.clasesGrupalesService.create(createClaseGrupalDto);
  }

  @Get()
  findAll() {
    return this.clasesGrupalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clasesGrupalesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClaseGrupalDto: any) {
    return this.clasesGrupalesService.update(+id, updateClaseGrupalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clasesGrupalesService.remove(+id);
  }
}
