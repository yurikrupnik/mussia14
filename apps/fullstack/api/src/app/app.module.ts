import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@mussia14/backend/users-api';
import { BackendProductsApiModule } from '@mussia14/backend/products-api';
import { BackendDocsModule } from '@mussia14/backend/docs';
import { HealthModule } from '@mussia14/backend/health';
import { BackendLoggerModule } from '@mussia14/backend/logger';

import { AuthModule } from '@mussia14/backend/auth';
import { PubSubModule } from './pubsub/pubsub.module';

import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // cache: true,
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
})
export class AppModule {}
