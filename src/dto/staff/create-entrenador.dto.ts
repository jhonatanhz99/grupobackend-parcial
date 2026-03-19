export class CreateEntrenadorDto {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  id_especialidad: number;
  fecha_contratacion?: Date;
  estado?: string;
}
