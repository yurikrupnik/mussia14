import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AppController', 'GetUsers')
  getData(data) {
    return this.appService.findAll({}, '', {});
  }

  @GrpcMethod('AppController', 'CreateUser')
  create(data: any) {
    return this.appService.create(data);
  }
}
