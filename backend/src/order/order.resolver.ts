import { Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Context } from '@nestjs/graphql';

@Resolver(() => Order)
export class OrderResolver {

  constructor(private orderService: OrderService) {}

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'MEMBER')
  createOrder(@Context() context) {

    const user = context.req.user;

    return this.orderService.createOrder(user);
  }
}