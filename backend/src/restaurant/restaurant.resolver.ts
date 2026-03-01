import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './entities/restaurant.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Context } from '@nestjs/graphql';

@Resolver(() => Restaurant)
export class RestaurantResolver {

  constructor(private restaurantService: RestaurantService) {}

  @Query(() => [Restaurant], {name: "restaurants"})
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER', 'MEMBER')
  async getRestaurants(@Context() context) {

    const user = context.req.user;

    return this.restaurantService.getRestaurants(user);
  }
}