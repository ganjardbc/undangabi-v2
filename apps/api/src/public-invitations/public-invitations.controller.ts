import { Controller, Get, Param } from '@nestjs/common';
import { PublicInvitationsService } from './public-invitations.service';
import { Public } from '../common/decorators/public.decorator';

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
}
