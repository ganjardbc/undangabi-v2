import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PublicInvitationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findBySlug(slug: string) {
    const invitation = await this.prisma.invitation.findFirst({
      where: {
        slug,
        status: 'published',
        deletedAt: null,
      },
      include: {
        // For now only basic info, more to come in Phase 3
        theme: true,
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found or not published');
    }

    return invitation;
  }

  async findMetaBySlug(slug: string) {
    const invitation = await this.prisma.invitation.findFirst({
      where: {
        slug,
        status: 'published',
        deletedAt: null,
      },
      select: {
        seoTitle: true,
        seoDescription: true,
        ogImageUrl: true,
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found or not published');
    }

    return invitation;
  }
}
