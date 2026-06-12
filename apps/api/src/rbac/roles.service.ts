import { Injectable } from '@nestjs/common';
import { Prisma, Role, UserRole } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.RoleCreateInput): Promise<Role> {
    return this.prisma.role.create({
      data,
    });
  }

  async findBySlug(slug: string): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: {
        slug,
      },
    });
  }

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  async assignRoleToUser(userId: string, roleId: string): Promise<UserRole> {
    return this.prisma.userRole.create({
      data: {
        userId,
        roleId,
      },
    });
  }

  async removeRoleFromUser(userId: string, roleId: string): Promise<Prisma.BatchPayload> {
    return this.prisma.userRole.deleteMany({
      where: {
        userId,
        roleId,
      },
    });
  }
}
