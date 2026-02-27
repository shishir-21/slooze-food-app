import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RestaurantService, RestaurantResolver],
})
export class RestaurantModule {}