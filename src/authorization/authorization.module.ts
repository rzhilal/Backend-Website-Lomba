import { Module } from '@nestjs/common';
import { RolesGuard } from './roles/roles.guard';

@Module({
  providers: [RolesGuard],
  exports: [RolesGuard],
})
export class AuthorizationModule {}
