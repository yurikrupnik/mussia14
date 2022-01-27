import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import { User } from '@mussia14/backend/users-api';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AppController', 'GetUsers')
  getData(data): Promise<Array<User>> {
    return this.appService.findAll({}, '', {});
  }

  @GrpcMethod('AppController', 'CreateUser')
  create(data: Partial<User>) {
    return this.appService.create(data);
  }
}
