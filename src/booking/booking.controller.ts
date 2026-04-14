import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('booking')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingController {
  constructor(private service: BookingService) {}

  // CUSTOMER → create booking
  @Post()
  @Roles('customer')
  create(@Body() body: any, @Request() req) {
    return this.service.create({
      user_id: req.user.userId,
      helper_id: body.helper_id,
      service_id: body.service_id,
      booking_date: body.booking_date,
    });
  }

  // VIEW ALL BOOKINGS
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // HELPER → accept booking
  @Patch(':id/accept')
  @Roles('helper')
  accept(@Param('id') id: string) {
    return this.service.updateStatus(+id, 'confirmed');
  }

  // HELPER → complete booking
  @Patch(':id/complete')
  @Roles('helper')
  complete(@Param('id') id: string) {
    return this.service.updateStatus(+id, 'completed');
  }
}