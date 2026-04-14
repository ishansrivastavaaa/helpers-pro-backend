import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private repo: Repository<Review>,
  ) {}

  async create(data: CreateReviewDto) {
    try {
      return await this.repo.save(this.repo.create(data));
    } catch (error) {
      throw new BadRequestException('Failed to create review');
    }
  }

  findByBooking(booking_id: number) {
    return this.repo.find({ where: { booking_id } });
  }

  findAll(page = 1, limit = 10) {
    return this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}