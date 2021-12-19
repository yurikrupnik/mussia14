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
import { AuthMiddleware } from './firebase/auth.middleware';
import { AuthController } from './firebase/auth.controller';

import { FriendsModule } from './friends/friends.module';
import { FirebaseAuthStrategy } from '@mussia14/backend/guards';

// import { FirebaseModule } from 'nestjs-firebase';

@Module({
  imports: [
    // FirebaseModule.forRoot({
    //   googleApplicationCredential: path.join(__dirname, '../', 'key.json'),
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      // cache: true,
      // envFilePath: './env.local',
    }),
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
  providers: [FirebaseAuthService, FirebaseAuthStrategy],
  // providers: [FirebaseAuthStrategy],
})
// export class AppModule {}
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      // not active try = /api/pubsub
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
