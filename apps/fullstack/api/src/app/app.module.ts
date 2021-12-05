import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { PubSubModule } from './pubsub/pubsub.module';
import { UsersModule } from '@mussia14/backend/users-api';

@Module({
  imports: [HealthModule, UsersModule, PubSubModule],
  exports: [],
})
export class AppModule {}
