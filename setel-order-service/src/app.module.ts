import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    OrdersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/dev'),
    // 'mongodb://seteladmin:secret@db:28017/dev?authSource=admin&readPreference=primary',
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
