import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Entrenador } from '../staff/entrenador.entity';

@Entity('clases_grupales')
export class ClaseGrupal {
  @PrimaryGeneratedColumn()
  id_clase: number;

  @Column({ length: 100 })
  nombre_clase: string;

  @Column()
  id_entrenador: number;

  @ManyToOne(() => Entrenador, (entrenador) => entrenador.clases)
  @JoinColumn({ name: 'id_entrenador' })
  entrenador: Entrenador;

  @Column({ type: 'datetime' })
  horario: Date;

  @Column({ type: 'int' })
  duracion_minutos: number;

  @Column({ type: 'int' })
  cupo_maximo: number;

  @Column({ type: 'int' })
  cupo_available: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
