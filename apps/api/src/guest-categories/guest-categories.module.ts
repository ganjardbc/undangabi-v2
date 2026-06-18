import { Module } from '@nestjs/common';
import { GuestCategoriesController } from './guest-categories.controller';
import { GuestCategoriesService } from './guest-categories.service';

@Module({
  controllers: [GuestCategoriesController],
  providers: [GuestCategoriesService],
  exports: [GuestCategoriesService],
})
export class GuestCategoriesModule {}
