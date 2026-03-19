import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Socio } from '../socios/socio.entity';
import { ServicioBienestar } from '../servicios-bienestar/servicio-bienestar.entity';

@Entity('consumos_servicios')
export class ConsumoServicio {
  @PrimaryGeneratedColumn()
  id_consumo: number;

  @ManyToOne(() => Socio, { eager: true, nullable: false })
  @JoinColumn({ name: 'id_socio' })
  socio: Socio;

  @ManyToOne(() => ServicioBienestar, { eager: true, nullable: false })
  @JoinColumn({ name: 'id_servicio' })
  servicio: ServicioBienestar;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_consumo: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, comment: 'Precio histórico al momento del consumo' })
  precio_cobrado: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn()
  created_at: Date;
}