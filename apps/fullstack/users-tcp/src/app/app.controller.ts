import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
  TcpContext,
} from '@nestjs/microservices';
import { User } from '@mussia14/backend/users-api';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get.list')
  getData(@Payload() data: number[], @Ctx() context: TcpContext) {
    console.log('context', context);
    console.log('data', data);
    // return data;
    return this.appService.findAll({}, '', {});
  }

  @MessagePattern('add.new')
  addPost(@Payload() data: User, @Ctx() context: TcpContext) {
    console.log('context', context);
    console.log('data', data);
    // return data;
    return this.appService.create(data);
  }
}
