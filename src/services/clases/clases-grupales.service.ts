import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaseGrupal } from '../../entities/clases/clase-grupal.entity';
import { CreateClaseGrupalDto } from '../../dto/clases/create-clase-grupal.dto';

@Injectable()
export class ClasesGrupalesService {
  constructor(
    @InjectRepository(ClaseGrupal)
    private readonly claseGrupalRepository: Repository<ClaseGrupal>,
  ) {}

  async create(createClaseGrupalDto: CreateClaseGrupalDto) {
    // Inicializar cupo disponible si no está definido
    if (createClaseGrupalDto.cupo_available === undefined) {
      createClaseGrupalDto.cupo_available = createClaseGrupalDto.cupo_maximo;
    }

    if (createClaseGrupalDto.cupo_available > createClaseGrupalDto.cupo_maximo) {
      throw new BadRequestException('El cupo disponible no puede exceder el cupo máximo');
    }

    const clase = this.claseGrupalRepository.create(createClaseGrupalDto);
    return await this.claseGrupalRepository.save(clase);
  }

  async findAll() {
    return await this.claseGrupalRepository.find({ relations: ['entrenador'] });
  }

  async findOne(id: number) {
    const clase = await this.claseGrupalRepository.findOne({ 
      where: { id_clase: id },
      relations: ['entrenador'] 
    });
    if (!clase) throw new NotFoundException(`Clase con ID ${id} no encontrada`);
    return clase;
  }

  async update(id: number, updateClaseGrupalDto: any) {
    const clase = await this.findOne(id);
    
    // Validar regla de cupo
    if (updateClaseGrupalDto.cupo_maximo !== undefined || updateClaseGrupalDto.cupo_available !== undefined) {
      const max = updateClaseGrupalDto.cupo_maximo ?? clase.cupo_maximo;
      const av = updateClaseGrupalDto.cupo_available ?? clase.cupo_available;
      if (av > max) {
        throw new BadRequestException('El cupo disponible no puede exceder el cupo máximo');
      }
    }

    await this.claseGrupalRepository.update(id, updateClaseGrupalDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const clase = await this.findOne(id);
    return await this.claseGrupalRepository.remove(clase);
  }
}
