import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IKafkaMessage } from '@mussia14/shared/interfaces';
import { AppService } from './app.service';
import { User } from '@mussia14/backend/users-api';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get.list')
  getData(@Payload() message?: IKafkaMessage<User[]>) {
    console.log('message', message);
    return this.appService.findAll({}, '', {});
  }

  @MessagePattern('add.new')
  addPost(@Payload() message: IKafkaMessage<User>) {
    return this.appService.create(message.value);
  }
}
