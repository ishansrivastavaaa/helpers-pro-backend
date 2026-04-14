import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity } from './service.entity/service.entity';

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(ServiceEntity)
        private readonly repo: Repository<ServiceEntity>,
    ) {}
    
    create(data: Partial<ServiceEntity>) {
        return this.repo.save(this.repo.create(data));
    }
    
    findAll() {
        return this.repo.find();
    }
}


