import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
// import * as firebaseConfig from './firebase.config.json';
import * as firebase from 'firebase-admin';
import admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth'
) {
  private defaultApp: firebase.app.App;

  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    console.log(this.configService.get('PORT'));
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert({
        private_key: this.configService.get('FIREBASE_PRIVATE_KEY'), // todo enum from those envs
        client_email: this.configService.get('FIREBASE_CLIENT_EMAIL'),
        project_id: this.configService.get('PROJECT_ID'),
      } as Partial<admin.ServiceAccount>),
      databaseURL: this.configService.get('FIREBASE_DATABASE_URL'),
      // databaseURL: '',
    });
  }

  async validate(token: string) {
    const firebaseUser: any = await this.defaultApp
      .auth()
      .verifyIdToken(token, true)
      .catch((err: Error) => {
        console.log(err);

        throw new UnauthorizedException(err.message);
      });

    if (!firebaseUser) {
      throw new UnauthorizedException();
    }

    return firebaseUser;
  }
}
