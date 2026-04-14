import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  booking_id!: number;

  @Column()
  rating!: number;

  @Column()
  comment!: string;
}