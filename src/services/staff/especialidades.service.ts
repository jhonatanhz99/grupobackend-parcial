import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialidad } from '../../entities/staff/especialidad.entity';
import { CreateEspecialidadDto } from '../../dto/staff/create-especialidad.dto';

@Injectable()
export class EspecialidadesService {
  constructor(
    @InjectRepository(Especialidad)
    private readonly especialidadRepository: Repository<Especialidad>,
  ) { }

  async create(createEspecialidadDto: CreateEspecialidadDto) {
    const especialidad = this.especialidadRepository.create(createEspecialidadDto);
    return await this.especialidadRepository.save(especialidad);
  }

  async findAll() {
    return await this.especialidadRepository.find();
  }

  async findOne(id: number) {
    const especialidad = await this.especialidadRepository.findOne({ where: { id_especialidad: id } });
    if (!especialidad) throw new NotFoundException(`Especialidad con ID ${id} no encontrada`);
    return especialidad;
  }

  async update(id: number, updateEspecialidadDto: any) {
    await this.findOne(id);
    await this.especialidadRepository.update(id, updateEspecialidadDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const especialidad = await this.findOne(id);
    return await this.especialidadRepository.remove(especialidad);
  }
}
