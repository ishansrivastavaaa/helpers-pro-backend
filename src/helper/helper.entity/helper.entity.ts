import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('helpers')
export class Helper {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  service_category!: string;

  @Column()
  experience!: number;

  @Column()
  pricing!: number;
}