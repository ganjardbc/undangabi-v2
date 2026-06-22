import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { QueryRsvpDto } from './dto/query-rsvp.dto';

@Injectable()
export class RsvpService {
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

  async findAll(invitationId: string, userId: string, query: QueryRsvpDto) {
    await this.ensureInvitationOwnership(invitationId, userId);

    const { page = 1, limit = 10, attendance_status } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.RsvpWhereInput = {
      invitationId,
      ...(attendance_status && { attendanceStatus: attendance_status }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.rsvp.findMany({
        where,
        skip,
        take: limit,
        orderBy: { submittedAt: 'desc' },
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
      this.prisma.rsvp.count({ where }),
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

  async summary(invitationId: string, userId: string) {
    await this.ensureInvitationOwnership(invitationId, userId);

    const [totalGuests, attending, notAttending] = await this.prisma.$transaction([
      this.prisma.guest.count({
        where: { invitationId, deletedAt: null },
      }),
      this.prisma.rsvp.count({
        where: { invitationId, attendanceStatus: 'attending' },
      }),
      this.prisma.rsvp.count({
        where: { invitationId, attendanceStatus: 'not_attending' },
      }),
    ]);

    return {
      total: totalGuests,
      attending,
      not_attending: notAttending,
      not_responded: totalGuests - attending - notAttending,
    };
  }
}
