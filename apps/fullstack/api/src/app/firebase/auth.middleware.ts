// import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
// import { HttpException } from '@nestjs/common/exceptions/http.exception';
// import { NextFunction, Request, Response } from 'express';
// import { FirebaseAuthService } from './firebase.service';
//
// export interface RequestModel extends Request {
//   user: any;
// }
// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(private readonly firebaseService: FirebaseAuthService) {}
//
//   public async use(req: RequestModel, _: Response, next: NextFunction) {
//     const { authorization } = req.headers;
//     if (!authorization) {
//       throw new HttpException(
//         { message: 'missing authorization header' },
//         HttpStatus.BAD_REQUEST
//       );
//     }
//     try {
//       req.user = await this.firebaseService.authenticate(authorization);
//       next();
//     } catch (err) {
//       console.log('err', err);
//       throw new HttpException(
//         { message: 'invalid token' },
//         HttpStatus.UNAUTHORIZED
//       );
//     }
//   }
// }
