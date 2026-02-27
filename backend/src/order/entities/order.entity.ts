// GraphQL Order Object Type

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OrderStatus } from '@prisma/client';

@ObjectType()
export class Order {

  @Field(() => ID)
  id: string;

  @Field()
  status: OrderStatus;

  @Field()
  country: string;

  @Field()
  userId: string;
}