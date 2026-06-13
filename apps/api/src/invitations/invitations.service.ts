import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { QueryInvitationDto } from './dto/query-invitation.dto';

// Use local slugify or import from packages if workspace is correctly linked
function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

@Injectable()
export class InvitationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateInvitationDto, userId: string) {
    const slug = dto.slug ? slugify(dto.slug) : slugify(dto.title);

    // Check if slug exists
    const existing = await this.prisma.invitation.findUnique({
      where: { slug },
    });

    if (existing) {
      throw new ConflictException('Slug already taken');
    }

    const invitation = await this.prisma.invitation.create({
      data: {
        title: dto.title,
        slug,
        eventType: dto.event_type || 'wedding',
        themeId: dto.theme_id,
        userId,
        status: 'draft',
      },
    });

    return {
      id: invitation.id,
      title: invitation.title,
      slug: invitation.slug,
      status: invitation.status,
    };
  }

  async findAll(userId: string, query: QueryInvitationDto) {
    const { page = 1, limit = 10, status, search } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.InvitationWhereInput = {
      userId,
      deletedAt: null,
      ...(status && { status }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { slug: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.invitation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          eventType: true,
          status: true,
          coverImageUrl: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
          themeId: true,
        },
      }),
      this.prisma.invitation.count({ where }),
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

  async findOne(id: string, userId: string) {
    const invitation = await this.prisma.invitation.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    return invitation;
  }

  async update(id: string, userId: string, dto: UpdateInvitationDto) {
    // 1. Check ownership
    const invitation = await this.findOne(id, userId);

    // 2. Handle slug change
    let slug = invitation.slug;
    if (dto.slug && dto.slug !== invitation.slug) {
      slug = slugify(dto.slug);
      const existing = await this.prisma.invitation.findUnique({
        where: { slug },
      });
      if (existing) {
        throw new ConflictException('Slug already taken');
      }
    }

    // 3. Update with mapped fields
    const updated = await this.prisma.invitation.update({
      where: { id },
      data: {
        title: dto.title,
        slug,
        eventType: dto.event_type,
        themeId: dto.theme_id,
        coverImageUrl: dto.cover_image_url,
        musicUrl: dto.music_url,
        youtubeUrl: dto.youtube_url,
        story: dto.story,
        seoTitle: dto.seo_title,
        seoDescription: dto.seo_description,
        ogImageUrl: dto.og_image_url,
        themeConfig: dto.theme_config as any,
        sectionVisibility: dto.section_visibility as any,
      },
    });

    return updated;
  }

  async remove(id: string, userId: string) {
    // 1. Validate ownership
    await this.findOne(id, userId);

    // 2. Soft delete
    const deleted = await this.prisma.invitation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return deleted;
  }

  async publish(id: string, userId: string) {
    const invitation = await this.findOne(id, userId);

    if (invitation.status === 'published') {
      throw new ConflictException('Invitation is already published');
    }

    if (invitation.status === 'archived') {
      throw new BadRequestException('Cannot publish an archived invitation');
    }

    const updated = await this.prisma.invitation.update({
      where: { id },
      data: {
        status: 'published',
        publishedAt: new Date(),
      },
    });

    return updated;
  }

  async archive(id: string, userId: string) {
    const invitation = await this.findOne(id, userId);

    if (invitation.status === 'archived') {
      throw new ConflictException('Invitation is already archived');
    }

    const updated = await this.prisma.invitation.update({
      where: { id },
      data: {
        status: 'archived',
        archivedAt: new Date(),
      },
    });

    return updated;
  }

  async duplicate(id: string, userId: string) {
    const original = await this.findOne(id, userId);
    const suffix = Date.now().toString(36);
    const newSlug = `${original.slug}-copy-${suffix}`;

    const invitation = await this.prisma.invitation.create({
      data: {
        title: `${original.title} (Copy)`,
        slug: newSlug,
        eventType: original.eventType,
        userId,
        themeId: original.themeId,
        coverImageUrl: original.coverImageUrl,
        musicUrl: original.musicUrl,
        youtubeUrl: original.youtubeUrl,
        story: original.story,
        seoTitle: original.seoTitle,
        seoDescription: original.seoDescription,
        ogImageUrl: original.ogImageUrl,
        themeConfig: original.themeConfig as any,
        sectionVisibility: original.sectionVisibility as any,
        status: 'draft',
      },
    });

    return {
      id: invitation.id,
      title: invitation.title,
      slug: invitation.slug,
      status: invitation.status,
    };
  }
}