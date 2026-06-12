import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RolesService } from '../rbac/roles.service';
import { PrismaService } from '../database/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<any> {
    // 1. Check if user already exists
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    // 3. Create user and assign role in a transaction
    const user = await this.prisma.$transaction(async (tx) => {
      // Create user
      const newUser = await tx.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          passwordHash: hashedPassword,
          phone: dto.phone,
          status: 'active',
        },
      });

      // Find role 'customer'
      const customerRole = await tx.role.findUnique({
        where: { slug: 'customer' },
      });

      if (!customerRole) {
        throw new InternalServerErrorException('Default customer role not found in the database');
      }

      // Assign role to user
      await tx.userRole.create({
        data: {
          userId: newUser.id,
          roleId: customerRole.id,
        },
      });

      return newUser;
    });

    // 4. Return user object excluding passwordHash
    const { passwordHash, ...result } = user;
    return result;
  }

  async login(dto: LoginDto): Promise<any> {
    // 1. Find user by email
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Compare password
    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash ?? '');
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Retrieve user roles
    const userRoles = await this.prisma.userRole.findMany({
      where: {
        userId: user.id,
      },
      include: {
        role: true,
      },
    });

    const roles = userRoles.map((ur) => ur.role.slug);

    // 4. Generate access token
    const payload = {
      sub: user.id,
      email: user.email,
      roles,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    // 5. Return token and user details (excluding passwordHash)
    const { passwordHash, ...userDetails } = user;

    return {
      accessToken,
      user: userDetails,
    };
  }

  async getProfile(userId: string): Promise<any> {
    // 1. Query user by ID (respecting soft-delete check)
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 2. Query user roles and permissions
    const userRoles = await this.prisma.userRole.findMany({
      where: {
        userId: user.id,
      },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    const roles = userRoles.map((ur) => ur.role.slug);
    const permissions = Array.from(
      new Set(
        userRoles.flatMap((ur) =>
          ur.role.rolePermissions.map((rp) => rp.permission.slug)
        )
      )
    );

    // 3. Exclude passwordHash and return profile details
    const { passwordHash, ...userDetails } = user;

    return {
      ...userDetails,
      roles,
      permissions,
    };
  }
}
