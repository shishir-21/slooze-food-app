import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class MenuItem {

  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  restaurantId: string;
}