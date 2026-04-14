import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column()
  base_price!: number;
}