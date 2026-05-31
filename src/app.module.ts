import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { ServiceModule } from './service/service.module';
import { HelperModule } from './helper/helper.module';
import { ReviewModule } from './review/review.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { AIModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),

    TestModule,

    AuthModule,

    UserModule,

    BookingModule,

    ServiceModule,

    HelperModule,

    ReviewModule,

    PaymentModule,

    NotificationModule,

    AIModule,
  ],
})
export class AppModule {}
