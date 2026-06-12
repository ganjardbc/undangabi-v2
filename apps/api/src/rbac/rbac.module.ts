import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { PermissionsService } from './permissions.service';

@Module({
  providers: [RolesService, PermissionsService],
  exports: [RolesService, PermissionsService],
})
export class RbacModule {}
