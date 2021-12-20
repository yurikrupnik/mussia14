import { Inject } from '@nestjs/common';
import { FirebaseConstants } from './firebase-admin.constants';

export function InjectFirebaseAdmin() {
  return Inject(FirebaseConstants.FIREBASE_TOKEN);
}
