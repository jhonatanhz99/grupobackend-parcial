
import { IsString, IsEmail, IsNotEmpty, IsDateString } from 'class-validator';

/**
 * DTO para la creación de un nuevo Socio.
 * Contiene las validaciones para los datos de entrada.
 */
export class CreateSocioDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly apellido: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsDateString()
  @IsNotEmpty()
  readonly fechaNacimiento: Date;

  // El estado de la membresía y el plan se asignarán internamente
  // en la lógica de negocio (servicio).
}
