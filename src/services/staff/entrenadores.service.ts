import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entrenador } from '../../entities/staff/entrenador.entity';
import { CreateEntrenadorDto } from '../../dto/staff/create-entrenador.dto';

@Injectable()
export class EntrenadoresService {
  constructor(
    @InjectRepository(Entrenador)
    private readonly entrenadorRepository: Repository<Entrenador>,
  ) {}

  async create(createEntrenadorDto: CreateEntrenadorDto) {
    const entrenador = this.entrenadorRepository.create(createEntrenadorDto);
    return await this.entrenadorRepository.save(entrenador);
  }

  async findAll() {
    return await this.entrenadorRepository.find({ relations: ['especialidad'] });
  }

  async findOne(id: number) {
    const entrenador = await this.entrenadorRepository.findOne({ 
      where: { id_entrenador: id },
      relations: ['especialidad'] 
    });
    if (!entrenador) throw new NotFoundException(`Entrenador con ID ${id} no encontrado`);
    return entrenador;
  }

  async update(id: number, updateEntrenadorDto: any) {
    await this.findOne(id);
    await this.entrenadorRepository.update(id, updateEntrenadorDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entrenador = await this.findOne(id);
    return await this.entrenadorRepository.remove(entrenador);
  }
}
