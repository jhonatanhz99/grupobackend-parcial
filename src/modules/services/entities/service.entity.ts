import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('servicios_bienestar')
export class ServiceEntity {
  @PrimaryGeneratedColumn({ name: 'id_servicio' })
  id: number;

  @Column({ name: 'nombre' })
  name: string;

  @Column({ name: 'precio' })
  price: number;

  @Column({ name: 'descripcion', nullable: true })
  description: string;

  @Column({ name: 'activo', default: true })
  active: boolean;

  @Column({ name: 'created_at', nullable: true })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
