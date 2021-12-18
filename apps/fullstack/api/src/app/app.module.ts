import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { PubSubModule } from './pubsub/pubsub.module';
import { FirebaseAuthService } from './firebase/firebase.service';
import { BackendLoggerModule } from '@mussia14/backend/logger';
import { AuthMiddleware } from './firebase/auth.middleware';
import { AuthController } from './firebase/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@mussia14/backend/users-api';
import { BackendProductsApiModule } from '@mussia14/backend/products-api';
import { BackendDocsModule } from '@mussia14/backend/docs';

import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // cache: true,
      // envFilePath: './env.local',
    }),
    FriendsModule,
    BackendDocsModule,
    BackendProductsApiModule,
    BackendLoggerModule,
    HealthModule,
    UsersModule,
    PubSubModule,
  ],
  controllers: [AuthController],
  exports: [FirebaseAuthService],
  providers: [FirebaseAuthService],
})
// export class AppModule {}
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      // not active try = /api/pubsub
      .forRoutes({ path: '/', method: RequestMethod.ALL });
  }
}
