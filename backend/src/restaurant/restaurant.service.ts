// Service layer handles database logic

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RestaurantService {

  constructor(private prisma: PrismaService) { }

  // Fetch all restaurants
  async getRestaurants(user: any) {
    console.log("Logged user:", user);
    console.log("User country:", user.country);

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
  // 🔹 Fetch single restaurant
  async getRestaurant(id: string, user: any) {

    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id },
      include: { menuItems: true }
    });

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    // Country restriction
    if (user.role !== 'ADMIN' && restaurant.country !== user.country) {
      throw new Error("Unauthorized access");
    }

    return restaurant;
  }
}