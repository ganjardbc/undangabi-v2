import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Permissions } from '../common/decorators/permissions.decorator';
import { CreateGuestDto } from './dto/create-guest.dto';
import { QueryGuestDto } from './dto/query-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { GuestsService } from './guests.service';

@Controller('invitations/:invitationId/guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @Post()
  @Permissions('manage_own_guests')
  async create(
    @Param('invitationId') invitationId: string,
    @Body() dto: CreateGuestDto,
    @CurrentUser() user: any,
  ) {
    const data = await this.guestsService.create(invitationId, user.sub, dto);
    return {
      success: true,
      message: 'Guest created',
      data,
    };
  }

  @Get()
  @Permissions('manage_own_guests')
  async findAll(
    @Param('invitationId') invitationId: string,
    @Query() query: QueryGuestDto,
    @CurrentUser() user: any,
  ) {
    const result = await this.guestsService.findAll(invitationId, user.sub, query);
    return {
      success: true,
      message: 'Success',
      ...result,
    };
  }

  @Get(':guestId')
  @Permissions('manage_own_guests')
  async findOne(
    @Param('invitationId') invitationId: string,
    @Param('guestId') guestId: string,
    @CurrentUser() user: any,
  ) {
    const data = await this.guestsService.findOne(invitationId, user.sub, guestId);
    return {
      success: true,
      message: 'Success',
      data,
    };
  }

  @Patch(':guestId')
  @Permissions('manage_own_guests')
  async update(
    @Param('invitationId') invitationId: string,
    @Param('guestId') guestId: string,
    @Body() dto: UpdateGuestDto,
    @CurrentUser() user: any,
  ) {
    const data = await this.guestsService.update(invitationId, user.sub, guestId, dto);
    return {
      success: true,
      message: 'Guest updated',
      data,
    };
  }

  @Delete(':guestId')
  @Permissions('manage_own_guests')
  async remove(
    @Param('invitationId') invitationId: string,
    @Param('guestId') guestId: string,
    @CurrentUser() user: any,
  ) {
    await this.guestsService.remove(invitationId, user.sub, guestId);
    return {
      success: true,
      message: 'Guest deleted',
      data: null,
    };
  }

  @Post('import')
  @Permissions('manage_own_guests')
  @UseInterceptors(FileInterceptor('file'))
  async importCsv(
    @Param('invitationId') invitationId: string,
    @UploadedFile() file: any,
    @CurrentUser() user: any,
  ) {
    const data = await this.guestsService.importCsv(invitationId, user.sub, file);
    return {
      success: true,
      message: 'Guests imported',
      data,
    };
  }

  @Get(':guestId/link')
  @Permissions('manage_own_guests')
  async getPersonalizedLink(
    @Param('invitationId') invitationId: string,
    @Param('guestId') guestId: string,
    @CurrentUser() user: any,
  ) {
    const data = await this.guestsService.getPersonalizedLink(invitationId, user.sub, guestId);
    return {
      success: true,
      message: 'Success',
      data,
    };
  }

  @Get(':guestId/qr')
  @Permissions('manage_own_guests')
  async getGuestQr(
    @Param('invitationId') invitationId: string,
    @Param('guestId') guestId: string,
    @CurrentUser() user: any,
  ) {
    const data = await this.guestsService.getGuestQr(invitationId, user.sub, guestId);
    return {
      success: true,
      message: 'Success',
      data,
    };
  }
}
