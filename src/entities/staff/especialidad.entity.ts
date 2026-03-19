import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Entrenador } from './entrenador.entity';

@Entity('especialidades')
export class Especialidad {
  @PrimaryGeneratedColumn()
  id_especialidad: number;

  @Column({ length: 80 })
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  bono_por_clase: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Entrenador, (entrenador) => entrenador.especialidad)
  entrenadores: Entrenador[];
}
