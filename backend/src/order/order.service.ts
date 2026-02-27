// Order business logic

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {

  constructor(private prisma: PrismaService) {}

  // Create new order
 async createOrder(user: any) {
  console.log("DEBUG: User object from Guard ->", user); // Look at your terminal after running the mutation
  
  return this.prisma.order.create({
    data: {
      user: {
        connect: { id: user.userId } // We need to check if it's user.userId or user.id
      },
      country: user.country,
    }
  });
}
}