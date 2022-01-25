import { Controller } from '@nestjs/common';
import {
  Payload,
  MessagePattern,
  RedisContext,
  Ctx,
} from '@nestjs/microservices';
import { User } from '@mussia14/backend/users-api';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get.list')
  getData(@Payload() data: number[], @Ctx() context: RedisContext) {
    return this.appService.findAll({}, '', {});
  }

  @MessagePattern('add.new')
  addPost(@Payload() data: User, @Ctx() context: RedisContext) {
    return this.appService.create(data);
  }
}
