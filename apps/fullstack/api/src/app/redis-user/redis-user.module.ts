import { Module } from '@nestjs/common';
import { RedisUserService } from './redis-user.service';
import { RedisUserController } from './redis-user.controller';

@Module({
  controllers: [RedisUserController],
  providers: [RedisUserService],
})
export class RedisUserModule {}
