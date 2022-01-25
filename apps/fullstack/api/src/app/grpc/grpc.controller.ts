import { Body, Controller, Get, Post, Req } from '@nestjs/common';
// import { RedisUserService } from './redis-user.service';
// import { CreateRedisUserDto } from './dto/create-redis-user.dto';
// import { UpdateRedisUserDto } from './dto/update-redis-user.dto';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { join } from 'path';
import { User } from '@mussia14/backend/users-api';

export interface IGrpcService {
  accumulate(numberArray: INumberArray): Observable<any>;
  getUsers(query: any): any;
  createUser(body: any): Observable<User>;
}

interface INumberArray {
  data: number[];
}

@Controller('grpc-user')
export class GrpcController {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'app',
      protoPath: join(__dirname, 'assets/app.proto'),
    },
  })
  private client: ClientGrpc;

  private grpcService: IGrpcService;

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('AppController'); // <-- Add this
  }

  @Post()
  create(@Body() createRedisUserDto: any) {
    return this.grpcService.createUser(createRedisUserDto);
  }

  @Get()
  findAll(@Req() request) {
    // return 'sss';
    return this.grpcService.getUsers({});
  }
}
