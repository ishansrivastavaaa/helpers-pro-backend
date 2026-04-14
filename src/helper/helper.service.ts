import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Helper } from './helper.entity/helper.entity';

@Injectable()
export class HelperService {
  constructor(
    @InjectRepository(Helper)
    private repo: Repository<Helper>,
  ) {}

  create(data: Partial<Helper>) {
    return this.repo.save(this.repo.create(data));
  }

  findByCategory(category: string) {
    return this.repo.find({
      where: { service_category: category },
    });
  }
}