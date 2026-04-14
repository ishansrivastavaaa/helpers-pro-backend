import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  notify(userId: number, message: string) {
    console.log(`Notify ${userId}: ${message}`);
  }
}