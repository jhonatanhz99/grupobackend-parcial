
import { PartialType } from '@nestjs/mapped-types';
import { CreateSocioDto } from '../../dto/create-socio.dto';

/**
 * DTO para la actualización de un Socio.
 * Hereda las propiedades y validaciones de CreateSocioDto,
 * pero las hace todas opcionales.
 */
export class UpdateSocioDto extends PartialType(CreateSocioDto) {}
