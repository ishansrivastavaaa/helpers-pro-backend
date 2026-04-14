import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './service.entity/service.entity';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  providers: [ServiceService],
  controllers: [ServiceController],
})
export class ServiceModule {}