import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity/booking.entity';
import { Repository } from 'typeorm';
import { BookingGateway } from './booking.gateway';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private repo: Repository<Booking>,
    private gateway: BookingGateway,
  ) {}

  create(data: Partial<Booking>) {
    const booking = this.repo.create(data);
    const savedBooking = this.repo.save(booking);
    this.gateway.sendUpdate('booking_created', savedBooking);
    return savedBooking;
  }

  findAll() {
    return this.repo.find();
  }

  async updateStatus(id: number, status: string) {
    await this.repo.update(id, { status });
    const booking = await this.repo.findOne({ where: { id } });
    this.gateway.sendUpdate('booking_updated', booking);
    return booking;
  }
}