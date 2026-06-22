import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { SubmitRsvpDto } from './dto/submit-rsvp.dto';

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

  async submitRsvp(slug: string, dto: SubmitRsvpDto) {
    const invitation = await this.findBySlug(slug);

    const guest = await this.prisma.guest.findFirst({
      where: {
        invitationId: invitation.id,
        invitationToken: dto.guest_token,
        deletedAt: null,
      },
    });

    if (!guest) {
      throw new BadRequestException('Invalid guest token');
    }

    return this.prisma.$transaction(async (tx) => {
      const rsvp = await tx.rsvp.upsert({
        where: { guestId: guest.id },
        update: {
          attendanceStatus: dto.attendance_status,
          guestCount: dto.guest_count ?? 1,
          message: dto.message,
          submittedAt: new Date(),
        },
        create: {
          guestId: guest.id,
          invitationId: invitation.id,
          attendanceStatus: dto.attendance_status,
          guestCount: dto.guest_count ?? 1,
          message: dto.message,
          submittedAt: new Date(),
        },
      });

      await tx.guest.update({
        where: { id: guest.id },
        data: { status: 'rsvp_submitted' },
      });

      return rsvp;
    });
  }
}
