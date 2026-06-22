import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PublicInvitationsService } from './public-invitations.service';
import { Public } from '../common/decorators/public.decorator';
import { SubmitRsvpDto } from './dto/submit-rsvp.dto';
import { SubmitGuestbookDto } from './dto/submit-guestbook.dto';
import { QueryPublicGuestbookDto } from './dto/query-public-guestbook.dto';

@Controller('public/invitations')
export class PublicInvitationsController {
  constructor(private readonly publicInvitationsService: PublicInvitationsService) {}

  @Public()
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const data = await this.publicInvitationsService.findBySlug(slug);
    return {
      success: true,
      message: 'Invitation retrieved',
      data,
    };
  }

  @Public()
  @Get(':slug/meta')
  async findMetaBySlug(@Param('slug') slug: string) {
    const data = await this.publicInvitationsService.findMetaBySlug(slug);
    return {
      success: true,
      message: 'Invitation meta retrieved',
      data,
    };
  }

  @Public()
  @Post(':slug/rsvp')
  async submitRsvp(@Param('slug') slug: string, @Body() dto: SubmitRsvpDto) {
    const data = await this.publicInvitationsService.submitRsvp(slug, dto);
    return {
      success: true,
      message: 'RSVP submitted successfully',
      data,
    };
  }

  @Public()
  @Post(':slug/guestbook')
  async submitGuestbook(@Param('slug') slug: string, @Body() dto: SubmitGuestbookDto) {
    const data = await this.publicInvitationsService.submitGuestbook(slug, dto);
    return {
      success: true,
      message: 'Guestbook entry submitted successfully',
      data,
    };
  }

  @Public()
  @Get(':slug/guestbook')
  async getGuestbook(@Param('slug') slug: string, @Query() query: QueryPublicGuestbookDto) {
    const result = await this.publicInvitationsService.getPublicGuestbook(slug, query.page, query.limit);
    return {
      success: true,
      message: 'Guestbook entries retrieved',
      ...result,
    };
  }
}
