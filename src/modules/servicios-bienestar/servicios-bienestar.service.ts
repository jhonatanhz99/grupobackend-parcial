import { Injectable } from '@nestjs/common';
import { CreateServiciosBienestarDto } from './dto/create-servicios-bienestar.dto';
import { UpdateServiciosBienestarDto } from './dto/update-servicios-bienestar.dto';

@Injectable()
export class ServiciosBienestarService {
  create(createServiciosBienestarDto: CreateServiciosBienestarDto) {
    return 'This action adds a new serviciosBienestar';
  }

  findAll() {
    return `This action returns all serviciosBienestar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviciosBienestar`;
  }

  update(id: number, updateServiciosBienestarDto: UpdateServiciosBienestarDto) {
    return `This action updates a #${id} serviciosBienestar`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviciosBienestar`;
  }
}
