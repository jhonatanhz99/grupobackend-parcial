
import { IsInt, IsPositive, Min, Max } from 'class-validator';

export class GenerarFacturaDto {
  @IsInt()
  @IsPositive()
  id_socio: number;

  @IsInt()
  @Min(1)
  @Max(12)
  periodo_mes: number;

  @IsInt()
  @IsPositive()
  periodo_anio: number;
}