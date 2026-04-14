import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity/booking.entity';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingGateway } from './booking.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  providers: [BookingService, BookingGateway],
  controllers: [BookingController],
})
export class BookingModule {}