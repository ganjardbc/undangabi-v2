import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthModule } from './health/health.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RbacModule } from './rbac/rbac.module';
import { AuthModule } from './auth/auth.module';
import { InvitationsModule } from './invitations/invitations.module';
import { PublicInvitationsModule } from './public-invitations/public-invitations.module';
import { GuestsModule } from './guests/guests.module';
import { GuestCategoriesModule } from './guest-categories/guest-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    HealthModule,
    UsersModule,
    RbacModule,
    AuthModule,
    InvitationsModule,
    PublicInvitationsModule,
    GuestsModule,
    GuestCategoriesModule,
  ],
})
export class AppModule {}
