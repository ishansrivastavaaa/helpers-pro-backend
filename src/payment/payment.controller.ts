import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private service: PaymentService) {}

  @Post('create-order')
  create(@Body() body: any) {
    return this.service.createOrder(body.amount);
  }
}