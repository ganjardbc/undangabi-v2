import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { parse } from 'csv-parse/sync';
import { randomUUID } from 'crypto';
import { PrismaService } from '../database/prisma.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { QueryGuestDto } from './dto/query-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

@Injectable()
export class GuestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

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

  private async ensureCategory(invitationId: string, categoryId?: string) {
    if (!categoryId) return;

    const category = await this.prisma.guestCategory.findFirst({
      where: {
        id: categoryId,
        invitationId,
      },
    });

    if (!category) {
      throw new NotFoundException('Guest category not found');
    }
  }

  async create(invitationId: string, userId: string, dto: CreateGuestDto) {
    await this.ensureInvitationOwnership(invitationId, userId);
    await this.ensureCategory(invitationId, dto.category_id);

    const guest = await this.prisma.guest.create({
      data: {
        invitationId,
        categoryId: dto.category_id,
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        maxGuestCount: dto.max_guest_count ?? 1,
        invitationToken: randomUUID(),
        qrCodeToken: randomUUID(),
      },
    });

    return guest;
  }

  async findAll(invitationId: string, userId: string, query: QueryGuestDto) {
    await this.ensureInvitationOwnership(invitationId, userId);

    const { page = 1, limit = 10, search, category_id, status } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.GuestWhereInput = {
      invitationId,
      deletedAt: null,
      ...(category_id && { categoryId: category_id }),
      ...(status && { status }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.guest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
        },
      }),
      this.prisma.guest.count({ where }),
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

  async findOne(invitationId: string, userId: string, guestId: string) {
    await this.ensureInvitationOwnership(invitationId, userId);

    const guest = await this.prisma.guest.findFirst({
      where: {
        id: guestId,
        invitationId,
        deletedAt: null,
      },
      include: {
        category: true,
      },
    });

    if (!guest) {
      throw new NotFoundException('Guest not found');
    }

    return guest;
  }

  async update(invitationId: string, userId: string, guestId: string, dto: UpdateGuestDto) {
    await this.findOne(invitationId, userId, guestId);
    await this.ensureCategory(invitationId, dto.category_id);

    return this.prisma.guest.update({
      where: { id: guestId },
      data: {
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        categoryId: dto.category_id,
        maxGuestCount: dto.max_guest_count,
      },
    });
  }

  async remove(invitationId: string, userId: string, guestId: string) {
    await this.findOne(invitationId, userId, guestId);

    await this.prisma.guest.update({
      where: { id: guestId },
      data: { deletedAt: new Date() },
    });
  }

  async getPersonalizedLink(invitationId: string, userId: string, guestId: string) {
    const invitation = await this.ensureInvitationOwnership(invitationId, userId);

    const guest = await this.prisma.guest.findFirst({
      where: {
        id: guestId,
        invitationId,
        deletedAt: null,
      },
    });

    if (!guest) {
      throw new NotFoundException('Guest not found');
    }

    const publicWebUrl = this.configService.get<string>('PUBLIC_WEB_URL') || 'http://localhost:5173';

    const url = `${publicWebUrl}/${invitation.slug}?to=${encodeURIComponent(guest.name)}&token=${guest.invitationToken}`;

    return { url };
  }

  async importCsv(invitationId: string, userId: string, file: any) {
    if (!file) {
      throw new BadRequestException('CSV file is required');
    }

    await this.ensureInvitationOwnership(invitationId, userId);

    const csvText = file.buffer.toString('utf-8');
    let records: any[];

    try {
      records = parse(csvText, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relaxColumnCount: true,
      });
    } catch {
      throw new BadRequestException('Invalid CSV format');
    }

    if (records.length === 0) {
      throw new BadRequestException('CSV file is empty');
    }

    const nameKey = Object.keys(records[0]).find(k => k.toLowerCase() === 'name');
    if (!nameKey) {
      throw new BadRequestException('CSV must contain a "name" column');
    }

    const phoneKey = Object.keys(records[0]).find(k => k.toLowerCase() === 'phone');
    const emailKey = Object.keys(records[0]).find(k => k.toLowerCase() === 'email');
    const categoryKey = Object.keys(records[0]).find(k => k.toLowerCase() === 'category');
    const maxGuestKey = Object.keys(records[0]).find(k => k.toLowerCase() === 'max_guest_count');

    const result = await this.prisma.$transaction(async (tx) => {
      const guests: any[] = [];

      for (const record of records) {
        const name = record[nameKey]?.trim();
        if (!name) continue;

        let categoryId: string | undefined;

        if (categoryKey && record[categoryKey]?.trim()) {
          const categoryName = record[categoryKey].trim();
          const existing = await tx.guestCategory.findFirst({
            where: { invitationId, name: categoryName },
          });

          if (existing) {
            categoryId = existing.id;
          } else {
            const newCategory = await tx.guestCategory.create({
              data: { invitationId, name: categoryName },
            });
            categoryId = newCategory.id;
          }
        }

        guests.push({
          id: randomUUID(),
          invitationId,
          categoryId,
          name,
          phone: phoneKey ? record[phoneKey]?.trim() || null : null,
          email: emailKey ? record[emailKey]?.trim() || null : null,
          invitationToken: randomUUID(),
          qrCodeToken: randomUUID(),
          status: 'not_sent',
          maxGuestCount: maxGuestKey ? parseInt(record[maxGuestKey]?.trim(), 10) || 1 : 1,
        });
      }

      await tx.guest.createMany({ data: guests });
      return { imported: guests.length };
    });

    return result;
  }

  async getGuestQr(invitationId: string, userId: string, guestId: string) {
    await this.ensureInvitationOwnership(invitationId, userId);

    const guest = await this.prisma.guest.findFirst({
      where: {
        id: guestId,
        invitationId,
        deletedAt: null,
      },
    });

    if (!guest) {
      throw new NotFoundException('Guest not found');
    }

    const apiBaseUrl = this.configService.get<string>('API_BASE_URL') || 'http://localhost:3030/api/v1';

    const qr_code_url = `${apiBaseUrl}/check-in/${guest.qrCodeToken}`;

    return {
      qr_code_token: guest.qrCodeToken,
      qr_code_url,
    };
  }
}
