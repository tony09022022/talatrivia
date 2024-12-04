import { SetMetadata } from '@nestjs/common';
import { Role } from '../../trivia/domain/role.enum.ts';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
