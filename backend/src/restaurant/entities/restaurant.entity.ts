// GraphQL Object Type for Restaurant

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Country } from '@prisma/client';

@ObjectType()
export class Restaurant {

  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  country: Country;
}