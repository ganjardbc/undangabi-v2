import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { QueryGuestbookDto } from './dto/query-guestbook.dto';

@Injectable()
export class GuestbookService {
  constructor(private readonly prisma: PrismaService) {}

  private async ensureInvitationOwnership(invitationId: string, userId: string) {
    const invitation = await this.prisma.invitation.findFirst({
      where: {
        id: invitationId,
        userId,
        deletedAt: null,
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    return invitation;
  }

  async findAll(invitationId: string, userId: string, query: QueryGuestbookDto) {
    await this.ensureInvitationOwnership(invitationId, userId);

    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.GuestbookWhereInput = {
      invitationId,
      deletedAt: null,
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.guestbook.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          guest: {
            select: {
              id: true,
              name: true,
              phone: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.guestbook.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async approve(invitationId: string, userId: string, guestbookId: string) {
    await this.ensureInvitationOwnership(invitationId, userId);

    const guestbook = await this.prisma.guestbook.findFirst({
      where: {
        id: guestbookId,
        invitationId,
        deletedAt: null,
      },
    });

    if (!guestbook) {
      throw new NotFoundException('Guestbook entry not found');
    }

    return this.prisma.guestbook.update({
      where: { id: guestbookId },
      data: { isApproved: true },
    });
  }

  async reject(invitationId: string, userId: string, guestbookId: string) {
    await this.ensureInvitationOwnership(invitationId, userId);

    const guestbook = await this.prisma.guestbook.findFirst({
      where: {
        id: guestbookId,
        invitationId,
        deletedAt: null,
      },
    });

    if (!guestbook) {
      throw new NotFoundException('Guestbook entry not found');
    }

    await this.prisma.guestbook.update({
      where: { id: guestbookId },
      data: { deletedAt: new Date() },
    });
  }
}
