import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthService {
  constructor(private logger: Logger) {}

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
        this.logger.error(JSON.stringify(err));
        throw new UnauthorizedException(err.message);
      });
  }
}
