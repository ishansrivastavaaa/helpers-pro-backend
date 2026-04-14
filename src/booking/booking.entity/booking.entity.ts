import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  helper_id!: number;

  @Column()
  service_id!: number;

  @Column()
  booking_date!: Date;

  @Column({ default: 'pending' })
  status!: string;
}