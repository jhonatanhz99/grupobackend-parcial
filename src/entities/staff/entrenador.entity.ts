import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Especialidad } from '../staff/especialidad.entity';
import { ClaseGrupal } from '../clases/clase-grupal.entity';

@Entity('entrenadores')
export class Entrenador {
  @PrimaryGeneratedColumn()
  id_entrenador: number;

  @Column({ length: 80 })
  nombre: string;

  @Column({ length: 80 })
  apellido: string;

  @Column({ length: 120, unique: true })
  email: string;

  @Column({ length: 20, nullable: true })
  telefono: string;

  @Column()
  id_especialidad: number;

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.entrenadores)
  @JoinColumn({ name: 'id_especialidad' })
  especialidad: Especialidad;

  @Column({ type: 'date', nullable: true })
  fecha_contratacion: Date;

  @Column({ type: 'enum', enum: ['activo', 'inactivo'], default: 'activo' })
  estado: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ClaseGrupal, (clase) => clase.entrenador)
  clases: ClaseGrupal[];
}
