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

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'MEMBER') // Teeno roles item add kar sakte hain
async addItemToOrder(
  @Args('orderId') orderId: string,
  @Args('menuItemId') menuItemId: string,
  @Args('quantity') quantity: number,
  @Context() context
) {
  const user = context.req.user; // JWT token se user info nikaali

  await this.orderService.addItemToOrder(
    orderId,
    menuItemId,
    quantity,
    user
  );

  return "Item added successfully";
}
}