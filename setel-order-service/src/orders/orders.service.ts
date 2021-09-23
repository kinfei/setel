import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from '../models/order';

import { verifyPayment } from '../api';

@Injectable()
export class OrdersService {
  public static readonly CREATED = 'created';
  public static readonly CONFIRMED = 'confirmed';
  public static readonly DELIVERED = 'delivered';
  public static readonly CANCELLED = 'cancelled';

  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) {}

  async createOrder(name: string, price: number, description: string) {
    const currentDate = Date.now();

    const newOrder = new this.orderModel({
      name,
      price,
      description,
      status: OrdersService.CREATED,
      created_at: currentDate,
      updated_at: currentDate,
    });

    await newOrder.save();

    this.verifyOrder(newOrder);

    return {
      id: newOrder.id,
      name: newOrder.name,
      price: newOrder.price,
      description: newOrder.description,
      status: newOrder.status,
      created: newOrder.created_at,
      updated: newOrder.updated_at,
    };
  }

  async getOrders() {
    const orders = await this.orderModel.find().sort({ _id: -1 }).exec();

    return orders.map((x) => ({
      id: x.id,
      name: x.name,
      price: x.price,
      description: x.description,
      status: x.status,
      created: x.created_at,
      updated: x.updated_at,
    }));
  }

  async getOrder(id: string) {
    const order = await this.findOrder(id);

    return {
      id: order.id,
      name: order.name,
      price: order.price,
      description: order.description,
      status: order.status,
      created: order.created_at,
      updated: order.updated_at,
    };
  }

  async cancelOrder(id: string) {
    const order = await this.findOrder(id);

    if (
      order.status === OrdersService.CANCELLED ||
      order.status === OrdersService.DELIVERED
    )
      throw new BadRequestException(`Order had been ${order.status}.`);

    order.status = OrdersService.CANCELLED;
    order.updated_at = new Date();

    order.save();
  }

  private async verifyOrder(order: Order) {
    try {
      const result = await verifyPayment(order);

      console.log({ result });

      order.updated_at = new Date();

      if (result.status === 'approved') {
        order.status = OrdersService.CONFIRMED;
        order.save();

        this.deliverOrder(order.id);
      } else {
        order.status = OrdersService.CANCELLED;
        order.save();
      }
    } catch (error) {
      throw new BadRequestException('Unable to verify payment.');
    }
  }

  private deliverOrder(id) {
    setTimeout(async () => {
      const order = await this.findOrder(id);

      if (order.status === OrdersService.CONFIRMED) {
        order.status = OrdersService.DELIVERED;
        order.updated_at = new Date();
        order.save();
      }
    }, 30000);
  }

  private async findOrder(id: string): Promise<Order> {
    let order;

    try {
      order = await this.orderModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find order.');
    }

    if (!order) {
      throw new NotFoundException('Could not find order.');
    }
    return order;
  }
}
