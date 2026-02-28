import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class PaymentMethod {

  @Field(() => ID)
  id: string;

  @Field()
  cardNumber: string;

  @Field()
  expiry: string;

  @Field()
  userId: string;
}