import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Helper } from './helper.entity/helper.entity';
import { HelperService } from './helper.service';
import { HelperController } from './helper.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Helper])],
  providers: [HelperService],
  controllers: [HelperController],
})
export class HelperModule {}
