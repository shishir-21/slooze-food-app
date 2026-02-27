import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {

  constructor(private prisma: PrismaService) {}

  async getMenuByRestaurant(restaurantId: string) {
    return this.prisma.menuItem.findMany({
      where: { restaurantId }
    });
  }
}