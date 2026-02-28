// Order business logic

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {

    constructor(private prisma: PrismaService) { }

    // Create new order
    async addItemToOrder(
        orderId: string,
        menuItemId: string,
        quantity: number,
        user: any
    ) {

        const order = await this.prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order || order.userId !== user.userId) {
            throw new Error("Unauthorized order access or Order not found");
        }


        return this.prisma.orderItem.create({
            data: {
                orderId,
                menuItemId,
                quantity
            }
        });
    }

    // Checkout order (change status to PAID)
    async checkoutOrder(orderId: string, user: any) {

        const order = await this.prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            throw new Error("Order not found");
        }

        // Optional: ensure user belongs to same country
        if (user.role !== 'ADMIN' && order.country !== user.country) {
            throw new Error("Unauthorized country access");
        }

        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: 'PAID' }
        });
    }

    // Cancel order
    async cancelOrder(orderId: string, user: any) {

        const order = await this.prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            throw new Error("Order not found");
        }

        if (user.role !== 'ADMIN' && order.country !== user.country) {
            throw new Error("Unauthorized country access");
        }

        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: 'CANCELLED' }
        });
    }
}