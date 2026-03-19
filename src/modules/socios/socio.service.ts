
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Socio } from '../modules/socios/entities/socio.entity';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';


@Injectable()
export class SocioService {
  constructor(
    @InjectRepository(Socio)
    private readonly socioRepository: Repository<Socio>,
  ) {}

  /**
   * Crea un nuevo socio en la base de datos.
   * @param createSocioDto - Datos para la creación del socio.
   * @returns El socio creado.
   */
  async create(createSocioDto: CreateSocioDto): Promise<Socio> {
    const nuevoSocio = this.socioRepository.create(createSocioDto);
    return await this.socioRepository.save(nuevoSocio);
  }

  /**
   * Obtiene todos los socios.
   * @returns Un arreglo de todos los socios.
   */
  async findAll(): Promise<Socio[]> {
    return await this.socioRepository.find({
      // relations: ['membresia', 'historialDeAsistencias'], // Descomentar cuando las relaciones estén listas
    });
  }

  /**
   * Busca un socio por su ID.
   * Incluye el estado de membresía y su historial de asistencias.
   * @param id - El ID del socio a buscar.
   * @returns El socio encontrado.
   * @throws NotFoundException si el socio no se encuentra.
   */
  async findOne(id: string): Promise<Socio> {
    const socio = await this.socioRepository.findOne({
      where: { id },
      // relations: ['membresia', 'historialDeAsistencias'], // Descomentar para cargar la info relacionada
    });
    if (!socio) {
      throw new NotFoundException(`Socio con ID "${id}" no encontrado.`);
    }
    return socio;
  }

  /**
   * Actualiza los datos de un socio.
   * @param id - El ID del socio a actualizar.
   * @param updateSocioDto - Los datos a actualizar.
   * @returns El socio actualizado.
   */
  async update(id: string, updateSocioDto: UpdateSocioDto): Promise<Socio> {
    const socio = await this.socioRepository.preload({
      id: id,
      ...updateSocioDto,
    });
    if (!socio) {
      throw new NotFoundException(`Socio con ID "${id}" no encontrado para actualizar.`);
    }
    return await this.socioRepository.save(socio);
  }

  /**
   * Elimina un socio de la base de datos.
   * @param id - El ID del socio a eliminar.
   */
  async remove(id: string): Promise<void> {
    const result = await this.socioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Socio con ID "${id}" no encontrado para eliminar.`);
    }
  }
}
