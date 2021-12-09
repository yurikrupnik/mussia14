import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '@mussia14/backend/users-api';

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
