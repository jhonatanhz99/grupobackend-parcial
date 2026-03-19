import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Socio } from '../socios/socio.entity';

@Entity('planes')
export class Plan {
  @PrimaryGeneratedColumn()
  id_plan: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo_mensual: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => Socio, (socio) => socio.plan)
  socios: Socio[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}