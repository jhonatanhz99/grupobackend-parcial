import { PartialType } from '@nestjs/mapped-types';
import { CreateServiciosBienestarDto } from './create-servicios-bienestar.dto';

export class UpdateServiciosBienestarDto extends PartialType(CreateServiciosBienestarDto) {}
