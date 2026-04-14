import Razorpay from 'razorpay';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  private razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  async createOrder(amount: number) {
    return this.razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
    });
  }
}