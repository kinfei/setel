import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body('name') name: string) {
    return await this.ordersService.createOrder(name);
  }

  @Get()
  async getOrders() {
    return await this.ordersService.getOrders();
  }

  @Get('/status/:id')
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }

  @Delete(':id')
  @HttpCode(204)
  cancelOrder(@Param('id') id: string) {
    return this.ordersService.cancelOrder(id);
  }
}
