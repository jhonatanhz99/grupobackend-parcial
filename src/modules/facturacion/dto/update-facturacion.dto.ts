import { PartialType } from '@nestjs/mapped-types';
import { GenerarFacturaDto } from './generar-factura.dto';

export class UpdateFacturacionDto extends PartialType(GenerarFacturaDto) {}
