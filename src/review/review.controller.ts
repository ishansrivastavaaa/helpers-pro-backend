import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReviewController {
  constructor(private service: ReviewService) {}

  // CUSTOMER → add review
  @Post()
  @Roles('customer')
  create(@Body() body: CreateReviewDto) {
    return this.service.create(body);
  }

  // GET reviews for booking
  @Get(':bookingId')
  get(@Param('bookingId') id: string) {
    return this.service.findByBooking(+id);
  }
}