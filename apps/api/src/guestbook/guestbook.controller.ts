import { Controller, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Permissions } from '../common/decorators/permissions.decorator';
import { QueryGuestbookDto } from './dto/query-guestbook.dto';
import { GuestbookService } from './guestbook.service';

@Controller('invitations/:invitationId/guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  @Permissions('manage_own_guestbook')
  async findAll(
    @Param('invitationId') invitationId: string,
    @Query() query: QueryGuestbookDto,
    @CurrentUser() user: any,
  ) {
    const result = await this.guestbookService.findAll(invitationId, user.sub, query);
    return {
      success: true,
      message: 'Success',
      ...result,
    };
  }

  @Patch(':guestbookId/approve')
  @Permissions('manage_own_guestbook')
  async approve(
    @Param('invitationId') invitationId: string,
    @Param('guestbookId') guestbookId: string,
    @CurrentUser() user: any,
  ) {
    const data = await this.guestbookService.approve(invitationId, user.sub, guestbookId);
    return {
      success: true,
      message: 'Guestbook entry approved',
      data,
    };
  }

  @Delete(':guestbookId')
  @Permissions('manage_own_guestbook')
  async remove(
    @Param('invitationId') invitationId: string,
    @Param('guestbookId') guestbookId: string,
    @CurrentUser() user: any,
  ) {
    await this.guestbookService.reject(invitationId, user.sub, guestbookId);
    return {
      success: true,
      message: 'Guestbook entry removed',
      data: null,
    };
  }
}
