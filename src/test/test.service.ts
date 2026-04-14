import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async getUsers() {
    return this.repo.find();
  }
}
