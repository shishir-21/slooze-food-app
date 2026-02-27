// Order business logic

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {

  constructor(private prisma: PrismaService) {}

  // Create new order
  async createOrder(user: any) {

    return this.prisma.order.create({
      data: {
        userId: user.userId,
        country: user.country
      }
    });
  }
}