import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { OrderSchema } from './models/order';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/dev', {
      useNewUrlParser: true,
    }),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class AppModule {}
