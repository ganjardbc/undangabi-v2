import { Injectable } from '@nestjs/common';
import { Permission, Prisma, RolePermission } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PermissionCreateInput): Promise<Permission> {
    return this.prisma.permission.create({
      data,
    });
  }

  async findBySlug(slug: string): Promise<Permission | null> {
    return this.prisma.permission.findUnique({
      where: {
        slug,
      },
    });
  }

  async findAll(): Promise<Permission[]> {
    return this.prisma.permission.findMany();
  }

  async assignPermissionToRole(roleId: string, permissionId: string): Promise<RolePermission> {
    return this.prisma.rolePermission.create({
      data: {
        roleId,
        permissionId,
      },
    });
  }

  async removePermissionFromRole(roleId: string, permissionId: string): Promise<Prisma.BatchPayload> {
    return this.prisma.rolePermission.deleteMany({
      where: {
        roleId,
        permissionId,
      },
    });
  }
}
