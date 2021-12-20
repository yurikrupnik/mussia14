import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@mussia14/backend/users-api';
import { BackendProductsApiModule } from '@mussia14/backend/products-api';
import { BackendDocsModule } from '@mussia14/backend/docs';
import { HealthModule } from './health/health.module';
import { PubSubModule } from './pubsub/pubsub.module';
import { FirebaseAuthService } from './firebase/firebase.service';
import { BackendLoggerModule } from '@mussia14/backend/logger';
import { AuthController } from './firebase/auth.controller';

import { AuthMiddleware } from './firebase/auth.middleware';
import { FriendsModule } from './friends/friends.module';
// import { FirebaseAuthStrategy } from '@mussia14/backend/guards';
import { AuthModule } from './auth/auth.module';

import { FirebaseModule } from '@mussia14/firebase-admin';
import admin from 'firebase-admin';

@Module({
  imports: [
    FirebaseModule.forRoot({
      credential: admin.credential.cert({
        private_key: process.env.FIREBASE_PRIVATE_KEY, // todo enum from those envs
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        project_id: process.env.PROJECT_ID,
      } as Partial<admin.ServiceAccount>),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      // cache: true,
      // envFilePath: './env.local',
    }),
    AuthModule,
    HealthModule,
    FriendsModule,
    BackendDocsModule,
    BackendProductsApiModule,
    BackendLoggerModule,
    UsersModule,
    PubSubModule,
  ],
  controllers: [AuthController],
  exports: [FirebaseAuthService],
  providers: [FirebaseAuthService],
  // providers: [FirebaseAuthStrategy],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   public configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       // not active try = /api/pubsub
//       .forRoutes({ path: '*', method: RequestMethod.ALL });
//   }
// }
