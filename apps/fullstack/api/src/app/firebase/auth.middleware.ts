import {
  createParamDecorator,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';
import { FirebaseAuthService } from './firebase.service';
export interface RequestModel extends Request {
  // yuri todo check
  user: any;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly firebaseService: FirebaseAuthService) {}

  public async use(req: RequestModel, _: Response, next: NextFunction) {
    const { authorization } = req.headers;
    console.log('authorization', authorization);
    if (!authorization) {
      throw new HttpException(
        { message: 'missing authz header' },
        HttpStatus.BAD_REQUEST
      );
    }
    try {
      const user = await this.firebaseService.authenticate(authorization);
      console.log(user);
      req.user = user;
      next();
    } catch (err) {
      throw new HttpException(
        { message: 'invalid token' },
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
