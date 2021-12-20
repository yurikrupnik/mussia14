import { UserRoles } from '@mussia14/backend/users-api';
import { Observable } from 'rxjs';
import {
  applyDecorators,
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
  // HttpException,
} from '@nestjs/common';

import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { FirebaseConstants } from '@mussia14/firebase-admin';

export function Auth(...roles: UserRoles[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    // UseGuards(AuthGuard),
    ApiBearerAuth(),
    UseGuards(AuthGuard(FirebaseConstants.FIREBASE_AUTH_GUARD)),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      // type: HttpException,
    })
    // ApiQuery({})
  );
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user && user.role && roles.includes(user.role);
  }
}
