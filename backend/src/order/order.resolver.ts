import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Order)
export class OrderResolver {

  constructor(private orderService: OrderService) { }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'MEMBER')
  async addItemToOrder(
    @Args('orderId') orderId: string,
    @Args('menuItemId') menuItemId: string,
    @Args('quantity') quantity: number,
    @Context() context
  ) {
    const user = context.req.user;

    await this.orderService.addItemToOrder(
      orderId,
      menuItemId,
      quantity,
      user
    );

    return "Item added successfully";
  }

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER') // Member NOT allowed
  checkoutOrder(
    @Args('orderId') orderId: string,
    @Context() context
  ) {
    const user = context.req.user;
    return this.orderService.checkoutOrder(orderId, user);
  }

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER') // Member not allowed
  cancelOrder(
    @Args('orderId') orderId: string,
    @Context() context
  ) {
    const user = context.req.user;
    return this.orderService.cancelOrder(orderId, user);
  }


  /**
 * Query to fetch orders based on user permissions.
 * Protected by JWT and Roles Guard.
 */

  @Query(() => [Order])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'MEMBER')
  getOrders(@Context() context) {
    const user = context.req.user;
    return this.orderService.getOrders(user);
  }

}