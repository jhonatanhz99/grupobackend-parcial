import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiciosBienestarService } from './servicios-bienestar.service';
import { CreateServiciosBienestarDto } from './dto/create-servicios-bienestar.dto';
import { UpdateServiciosBienestarDto } from './dto/update-servicios-bienestar.dto';

@Controller('servicios-bienestar')
export class ServiciosBienestarController {
  constructor(private readonly serviciosBienestarService: ServiciosBienestarService) {}

  @Post()
  create(@Body() createServiciosBienestarDto: CreateServiciosBienestarDto) {
    return this.serviciosBienestarService.create(createServiciosBienestarDto);
  }

  @Get()
  findAll() {
    return this.serviciosBienestarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviciosBienestarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiciosBienestarDto: UpdateServiciosBienestarDto) {
    return this.serviciosBienestarService.update(+id, updateServiciosBienestarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviciosBienestarService.remove(+id);
  }
}
