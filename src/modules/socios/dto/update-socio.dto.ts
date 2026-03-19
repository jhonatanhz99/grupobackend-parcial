
import { PartialType } from '@nestjs/mapped-types';
import { CreateSocioDto } from './create-socio.dto';

/**
 * DTO para la actualización de un Socio.
 * Hereda las propiedades y validaciones de CreateSocioDto,
 * pero las hace todas opcionales.
 */
export class UpdateSocioDto extends PartialType(CreateSocioDto) {}
