import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { UsersModule } from '@mussia14/backend/users-api';

@Module({
  imports: [HealthModule, UsersModule],
})
export class AppModule {}
