import { Module } from '@nestjs/common';
import { PublicInvitationsService } from './public-invitations.service';
import { PublicInvitationsController } from './public-invitations.controller';

@Module({
  controllers: [PublicInvitationsController],
  providers: [PublicInvitationsService],
  exports: [PublicInvitationsService],
})
export class PublicInvitationsModule {}
