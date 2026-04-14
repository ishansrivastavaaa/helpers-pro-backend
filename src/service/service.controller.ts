import { Controller, Post, Get, Body } from '@nestjs/common';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
    constructor(private readonly service: ServiceService) {}
    
    @Post()
    create(@Body() body: any) {
        return this.service.create(body);
    }
    
    @Get()
    findAll() {
        return this.service.findAll();
    }
}
