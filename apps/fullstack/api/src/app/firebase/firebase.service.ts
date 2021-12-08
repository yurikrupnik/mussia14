import { Injectable, UnauthorizedException } from '@nestjs/common';
import admin from 'firebase-admin';
import { MyLogger } from '../a-utils/my-logger/my-logger.service';

@Injectable()
export class FirebaseAuthService {
  constructor(private logger: MyLogger) {
    this.logger.setContext(FirebaseAuthService.name);
  }

  getToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new UnauthorizedException('INVALID_BEARER_TOKEN');
    }
    return match[1];
  }
  public authenticate(authToken: string): Promise<any> {
    const tokenString = this.getToken(authToken);
    return admin
      .auth()
      .verifyIdToken(tokenString)
      .then((decodedToken) => {
        const { email, uid, role } = decodedToken;
        this.logger.warn(JSON.stringify(decodedToken));
        return { email, uid, role };
      })
      .catch((err) => {
        this.logger.error(`error while authenticate request ${err.message}`);
        throw new UnauthorizedException(err.message);
      });
    // try {
    //   const decodedToken: admin.auth.DecodedIdToken = await admin
    //     .auth()
    //     .verifyIdToken(tokenString);
    //   this.logger.warn(`${JSON.stringify(decodedToken)}`);
    //   console.log({ decodedToken });
    //   const { email, uid, role } = decodedToken;
    //   return { email, uid, role };
    // } catch (err) {
    //   this.logger.error(`error while authenticate request ${err.message}`);
    //   throw new UnauthorizedException(err.message);
    // }
  }
}
