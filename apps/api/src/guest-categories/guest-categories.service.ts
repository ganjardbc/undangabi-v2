import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateGuestCategoryDto } from './dto/create-guest-category.dto';
import { UpdateGuestCategoryDto } from './dto/update-guest-category.dto';

@Injectable()
export class GuestCategoriesService {
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

  private handlePrismaError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new ConflictException('Guest category already exists');
    }

    throw error;
  }

  async create(invitationId: string, userId: string, dto: CreateGuestCategoryDto) {
    await this.ensureInvitationOwnership(invitationId, userId);

    try {
      return await this.prisma.guestCategory.create({
        data: {
          invitationId,
          name: dto.name,
          color: dto.color,
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll(invitationId: string, userId: string) {
    await this.ensureInvitationOwnership(invitationId, userId);

    return this.prisma.guestCategory.findMany({
      where: {
        invitationId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(invitationId: string, userId: string, categoryId: string, dto: UpdateGuestCategoryDto) {
    await this.ensureInvitationOwnership(invitationId, userId);

    const category = await this.prisma.guestCategory.findFirst({
      where: {
        id: categoryId,
        invitationId,
      },
    });

    if (!category) {
      throw new NotFoundException('Guest category not found');
    }

    try {
      return await this.prisma.guestCategory.update({
        where: { id: categoryId },
        data: {
          name: dto.name,
          color: dto.color,
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(invitationId: string, userId: string, categoryId: string) {
    await this.ensureInvitationOwnership(invitationId, userId);

    const category = await this.prisma.guestCategory.findFirst({
      where: {
        id: categoryId,
        invitationId,
      },
    });

    if (!category) {
      throw new NotFoundException('Guest category not found');
    }

    await this.prisma.guestCategory.delete({
      where: { id: categoryId },
    });
  }
}
