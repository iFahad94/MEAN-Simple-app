import { SetMetadata } from '@nestjs/common';
import { Roles } from './user-role.enum';

export const ROLES_KEY = 'roles';
export const ROLES = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
