import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Permissions } from '../common/decorators/permissions.decorator';
import { CreateGuestCategoryDto } from './dto/create-guest-category.dto';
import { UpdateGuestCategoryDto } from './dto/update-guest-category.dto';
import { GuestCategoriesService } from './guest-categories.service';

@Controller('invitations/:invitationId/guest-categories')
export class GuestCategoriesController {
  constructor(private readonly guestCategoriesService: GuestCategoriesService) {}

  @Post()
  @Permissions('manage_own_guests')
  async create(
    @Param('invitationId') invitationId: string,
    @Body() dto: CreateGuestCategoryDto,
    @CurrentUser() user: any,
  ) {
    const data = await this.guestCategoriesService.create(invitationId, user.sub, dto);
    return {
      success: true,
      message: 'Guest category created',
      data,
    };
  }

  @Get()
  @Permissions('manage_own_guests')
  async findAll(@Param('invitationId') invitationId: string, @CurrentUser() user: any) {
    const data = await this.guestCategoriesService.findAll(invitationId, user.sub);
    return {
      success: true,
      message: 'Success',
      data,
    };
  }

  @Patch(':categoryId')
  @Permissions('manage_own_guests')
  async update(
    @Param('invitationId') invitationId: string,
    @Param('categoryId') categoryId: string,
    @Body() dto: UpdateGuestCategoryDto,
    @CurrentUser() user: any,
  ) {
    const data = await this.guestCategoriesService.update(invitationId, user.sub, categoryId, dto);
    return {
      success: true,
      message: 'Guest category updated',
      data,
    };
  }

  @Delete(':categoryId')
  @Permissions('manage_own_guests')
  async remove(
    @Param('invitationId') invitationId: string,
    @Param('categoryId') categoryId: string,
    @CurrentUser() user: any,
  ) {
    await this.guestCategoriesService.remove(invitationId, user.sub, categoryId);
    return {
      success: true,
      message: 'Guest category deleted',
      data: null,
    };
  }
}
