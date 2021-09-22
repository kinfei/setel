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
  ApiTags,
} from '@nestjs/swagger';

import { OrderDto } from 'src/dto/order.dto';

import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
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
  async createOrder(@Body() newOrder: OrderDto) {
    try {
      return await this.ordersService.createOrder(
        newOrder.name,
        newOrder.price,
        newOrder.description,
      );
    } catch (err) {
      return { error: err.message };
    }
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
