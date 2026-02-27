// Service layer handles database logic

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RestaurantService {

  constructor(private prisma: PrismaService) {}

  // Fetch all restaurants
  async getRestaurants(user: any) {

    // If user is ADMIN → see all restaurants
    if (user.role === 'ADMIN') {
      return this.prisma.restaurant.findMany();
    }

    // Managers & Members → only their country
    return this.prisma.restaurant.findMany({
      where: {
        country: user.country
      }
    });
  }
}