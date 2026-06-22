import { Controller, Get, Param, Query } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Permissions } from '../common/decorators/permissions.decorator';
import { QueryRsvpDto } from './dto/query-rsvp.dto';
import { RsvpService } from './rsvp.service';

@Controller('invitations/:invitationId/rsvps')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) {}

  @Get('summary')
  @Permissions('manage_own_rsvp')
  async summary(
    @Param('invitationId') invitationId: string,
    @CurrentUser() user: any,
  ) {
    const data = await this.rsvpService.summary(invitationId, user.sub);
    return {
      success: true,
      message: 'Success',
      data,
    };
  }

  @Get()
  @Permissions('manage_own_rsvp')
  async findAll(
    @Param('invitationId') invitationId: string,
    @Query() query: QueryRsvpDto,
    @CurrentUser() user: any,
  ) {
    const result = await this.rsvpService.findAll(invitationId, user.sub, query);
    return {
      success: true,
      message: 'Success',
      ...result,
    };
  }
}
