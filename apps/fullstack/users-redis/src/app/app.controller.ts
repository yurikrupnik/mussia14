import { Controller, Get } from '@nestjs/common';
import {
  Payload,
  MessagePattern,
  RedisContext,
  Ctx,
} from '@nestjs/microservices';
import { User, UserDocument } from '@mussia14/backend/users-api';
import { AppService } from './app.service';
// import { IKafkaMessage } from '@mussia14/shared/interfaces';
// import { User } from '@mussia14/backend/users-api';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get.list')
  getData(@Payload() data: number[], @Ctx() context: RedisContext) {
    console.log('context', context);
    console.log('data', data);
    // return data;
    return this.appService.findAll({}, '', {});
  }

  @MessagePattern('add.new')
  addPost(@Payload() data: User, @Ctx() context: RedisContext) {
    console.log('context', context);
    console.log('data', data);
    // return data;
    return this.appService.create(data);
  }
}
