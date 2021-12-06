import { Injectable, UnauthorizedException } from '@nestjs/common';
// import * as CONSTANT from '../constants.api';
// import admin from '../../main';
import admin from 'firebase-admin';
import { MyLogger } from '../a-utils/my-logger/my-logger.service';

// admin.initializeApp({
//   credential: admin.credential.cert({
//     private_key: process.env.FIREBASE_PRIVATE_KEY,
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     project_id: process.env.FIREBASE_PROJECT_ID,
//   } as Partial<admin.ServiceAccount>),
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
// });

@Injectable()
export class FirebaseAuthService {
  constructor(private logger: MyLogger) {
    this.logger.setContext(FirebaseAuthService.name);
  }

  private getToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new UnauthorizedException('INVALID_BEARER_TOKEN');
    }
    return match[1];
  }
  public async authenticate(authToken: string): Promise<any> {
    const tokenString = this.getToken(authToken);
    try {
      const decodedToken: admin.auth.DecodedIdToken = await admin
        .auth()
        .verifyIdToken(tokenString);
      this.logger.debug(`${JSON.stringify(decodedToken)}`);
      console.log(decodedToken);
      const { email, uid, role } = decodedToken;
      return { email, uid, role };
    } catch (err) {
      this.logger.error(`error while authenticate request ${err.message}`);
      throw new UnauthorizedException(err.message);
    }
  }
}
