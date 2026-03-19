export class CreateClaseGrupalDto {
  nombre_clase: string;
  id_entrenador: number;
  horario: Date;
  duracion_minutos: number;
  cupo_maximo: number;
  cupo_available: number;
}
