import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { HelperService } from './helper.service';

@Controller('helpers')
export class HelperController {
  constructor(private readonly service: HelperService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get(':category')
  search(@Param('category') category: string) {
    return this.service.findByCategory(category);
  }
}