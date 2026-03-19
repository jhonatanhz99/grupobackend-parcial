import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string; // ej: Black, Gold, Basic

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'monthly_cost' })
  monthlyCost: number;

  // Relación con Socios (Members) añadible en el futuro
  // @OneToMany(() => Member, member => member.plan)
  // members: Member[];
}
