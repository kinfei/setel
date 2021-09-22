import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Delete,
  HttpCode,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
} from '@nestjs/swagger';

import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiProperty({ type: String, name: 'name' })
  @ApiCreatedResponse({
    status: 201,
    description: 'Create new order.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error.',
  })
  async createOrder(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description')
    description: string,
  ) {
    return await this.ordersService.createOrder(name, price, description);
  }

  @Get()
  @ApiOkResponse({
    description: 'Return order list.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  async getOrders() {
    return await this.ordersService.getOrders();
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Return order by id.',
  })
  @ApiNotFoundResponse({
    description: 'Record not found.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Cancel order.',
  })
  @ApiNotFoundResponse({
    description: 'Record not found.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  cancelOrder(@Param('id') id: string) {
    return this.ordersService.cancelOrder(id);
  }
}
