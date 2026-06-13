import { Controller, Post, Get, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { QueryInvitationDto } from './dto/query-invitation.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Permissions } from '../common/decorators/permissions.decorator';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  @Permissions('manage_own_invitations')
  async create(@Body() dto: CreateInvitationDto, @CurrentUser() user: any) {
    const data = await this.invitationsService.create(dto, user.sub);
    return {
      success: true,
      message: 'Invitation created',
      data,
    };
  }

  @Get()
  @Permissions('manage_own_invitations')
  async findAll(@Query() query: QueryInvitationDto, @CurrentUser() user: any) {
    const result = await this.invitationsService.findAll(user.sub, query);
    return {
      success: true,
      message: 'Success',
      ...result,
    };
  }

  @Get(':id')
  @Permissions('manage_own_invitations')
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    const data = await this.invitationsService.findOne(id, user.sub);
    return {
      success: true,
      message: 'Success',
      data,
    };
  }

  @Patch(':id')
  @Permissions('manage_own_invitations')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateInvitationDto,
    @CurrentUser() user: any,
  ) {
    const data = await this.invitationsService.update(id, user.sub, dto);
    return {
      success: true,
      message: 'Success',
      data,
    };
  }

  @Delete(':id')
  @Permissions('manage_own_invitations')
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    await this.invitationsService.remove(id, user.sub);
    return {
      success: true,
      message: 'Invitation deleted successfully',
      data: null,
    };
  }

  @Post(':id/publish')
  @Permissions('manage_own_invitations')
  async publish(@Param('id') id: string, @CurrentUser() user: any) {
    const data = await this.invitationsService.publish(id, user.sub);
    return {
      success: true,
      message: 'Invitation published successfully',
      data,
    };
  }

  @Post(':id/archive')
  @Permissions('manage_own_invitations')
  async archive(@Param('id') id: string, @CurrentUser() user: any) {
    const data = await this.invitationsService.archive(id, user.sub);
    return {
      success: true,
      message: 'Invitation archived successfully',
      data,
    };
  }

  @Post(':id/duplicate')
  @Permissions('manage_own_invitations')
  async duplicate(@Param('id') id: string, @CurrentUser() user: any) {
    const data = await this.invitationsService.duplicate(id, user.sub);
    return {
      success: true,
      message: 'Invitation duplicated',
      data,
    };
  }
}
