import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { InjectFirebaseAdmin, FirebaseAdmin } from '@mussia14/firebase-admin';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  validate(token: string) {
    return this.firebase
      .auth()
      .verifyIdToken(token) // todo check what was the second parapm of true
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException();
      });
  }
}
