// GraphQL Object Type for Restaurant

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Country } from '@prisma/client';
import { MenuItem } from '../../menu/entities/menu-item.entity';

@ObjectType()
export class Restaurant {

  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  country: Country;

  // Add this field
  @Field(() => [MenuItem], { nullable: true })
  menuItems?: MenuItem[];
}