import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {

  constructor(private prisma: PrismaService) {}

  async addPaymentMethod(cardNumber: string, expiry: string, user: any) {

    return this.prisma.paymentMethod.create({
      data: {
        cardNumber,
        expiry,
        userId: user.userId
      }
    });
  }

  async updatePaymentMethod(id: string, cardNumber: string, expiry: string) {
    return this.prisma.paymentMethod.update({
      where: { id },
      data: { cardNumber, expiry }
    });
  }
}