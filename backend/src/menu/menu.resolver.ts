import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuItem } from './entities/menu-item.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => MenuItem)
export class MenuResolver {

  constructor(private menuService: MenuService) {}

  @Query(() => [MenuItem])
  @UseGuards(JwtAuthGuard)
  getMenu(
    @Args('restaurantId') restaurantId: string
  ) {
    return this.menuService.getMenuByRestaurant(restaurantId);
  }
}