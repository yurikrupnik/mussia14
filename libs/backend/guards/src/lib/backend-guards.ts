import { UserRoles } from '@mussia14/backend/users-api';
import { Observable } from 'rxjs';
import {
  applyDecorators,
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  SetMetadata,
  UseGuards,
  // HttpException,
} from '@nestjs/common';

import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';
// import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase-auth') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    return true;
    // const s = super.canActivate(context);
    // console.log({ s });
    // return s;
  }
}

export function Auth(...roles: UserRoles[]) {
  return applyDecorators(
    // SetMetadata('roles', roles),
    // UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' })
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

@Injectable()
export class AuthGuardLocal implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization;

    if (!authToken) {
      throw new BadRequestException('MISSING_AUTH_HEADER');
    }

    // try {
    //   const user = await this.firebaseService.authenticate(authorization);
    //   console.log(user);
    //   req.user = user;
    //   next();
    // } catch (err) {
    //   throw new HttpException(
    //     { message: 'invalid token' },
    //     HttpStatus.UNAUTHORIZED
    //   );
    // }
    return true;
  }
}
