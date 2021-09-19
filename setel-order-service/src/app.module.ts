import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    OrdersModule,
    MongooseModule.forRoot(
      'mongodb://seteladmin:secret@0.0.0.0:27017/dev?authSource=admin',
    ),
    // 'mongodb://seteladmin:secret@db:28017/dev?authSource=admin&readPreference=primary',
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
