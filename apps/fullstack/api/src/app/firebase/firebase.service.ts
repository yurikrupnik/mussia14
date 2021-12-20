// import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
// import { InjectFirebaseAdmin, FirebaseAdmin } from '@mussia14/firebase-admin';
//
// interface IUser {
//   email: string;
//   uid: string;
//   role: string[];
// }
//
// @Injectable()
// export class FirebaseAuthService {
//   constructor(
//     @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
//     private logger: Logger
//   ) {}
//
//   getToken(authToken: string): string {
//     const match = authToken.match(/^Bearer (.*)$/);
//     if (!match || match.length < 2) {
//       throw new UnauthorizedException('INVALID_BEARER_TOKEN');
//     }
//     return match[1];
//   }
//
//   public authenticate(authToken: string): Promise<IUser> {
//     const tokenString = this.getToken(authToken);
//     return this.firebase
//       .auth()
//       .verifyIdToken(tokenString)
//       .then((decodedToken) => {
//         const { email, uid, role } = decodedToken;
//         return { email, uid, role };
//       })
//       .catch((err) => {
//         this.logger.error(JSON.stringify(err));
//         throw new UnauthorizedException(err.message);
//       });
//   }
// }
