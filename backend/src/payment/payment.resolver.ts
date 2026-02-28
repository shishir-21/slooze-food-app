import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentMethod } from './entities/payment.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => PaymentMethod)
export class PaymentResolver {

  constructor(private paymentService: PaymentService) {}

  @Mutation(() => PaymentMethod)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN') // Only Admin allowed
  addPaymentMethod(
    @Args('cardNumber') cardNumber: string,
    @Args('expiry') expiry: string,
    @Context() context
  ) {
    const user = context.req.user;
    return this.paymentService.addPaymentMethod(cardNumber, expiry, user);
  }

  @Mutation(() => PaymentMethod)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN') // Only Admin allowed
  updatePaymentMethod(
    @Args('id') id: string,
    @Args('cardNumber') cardNumber: string,
    @Args('expiry') expiry: string
  ) {
    return this.paymentService.updatePaymentMethod(id, cardNumber, expiry);
  }
}