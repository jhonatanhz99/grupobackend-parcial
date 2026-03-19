import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Socio } from '../socios/socio.entity';

@Entity('facturacion')
export class Facturacion {
  @PrimaryGeneratedColumn()
  id_factura: number;

  @ManyToOne(() => Socio, { eager: true, nullable: false })
  @JoinColumn({ name: 'id_socio' })
  socio: Socio;

  @Column({ type: 'tinyint', comment: '1-12' })
  periodo_mes: number;

  @Column({ type: 'year' })
  periodo_anio: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, comment: 'Snapshot del costo mensual del plan' })
  costo_plan: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  total_servicios: number;

  // Columna calculada: costo_plan + total_servicios
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    generatedType: 'STORED',
    asExpression: 'costo_plan + total_servicios',
  })
  total_pagar: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_generacion: Date;

  @CreateDateColumn()
  created_at: Date;
}
