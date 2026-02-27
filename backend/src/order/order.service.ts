// Order business logic

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {

  constructor(private prisma: PrismaService) {}

  // Create new order
 async addItemToOrder(
  orderId: string,
  menuItemId: string,
  quantity: number,
  user: any
) {
  // 1. Pehle check karein ki order exist karta hai aur usi user ka hai
  const order = await this.prisma.order.findUnique({
    where: { id: orderId }
  });

  if (!order || order.userId !== user.userId) {
    throw new Error("Unauthorized order access or Order not found");
  }

  // 2. OrderItem table mein entry create karein
  return this.prisma.orderItem.create({
    data: {
      orderId,
      menuItemId,
      quantity
    }
  });
}
}