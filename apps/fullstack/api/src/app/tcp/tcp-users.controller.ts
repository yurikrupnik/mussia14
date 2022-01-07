import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
// import { RedisUserService } from './redis-user.service';
// import { CreateRedisUserDto } from './dto/create-redis-user.dto';
// import { UpdateRedisUserDto } from './dto/update-redis-user.dto';
import {
  Client,
  ClientRedis,
  ClientTCP,
  TcpContext,
  Transport,
} from '@nestjs/microservices';

@Controller('tcp-user')
export class TcpUserController {
  // constructor(private readonly redisUserService: RedisUserService) {}

  @Client({
    transport: Transport.TCP,
    options: {
      // url: 'redis://localhost:6379',
    },
  })
  client: ClientTCP;

  @Post('')
  create(@Body() createRedisUserDto: any) {
    console.log('createRedisUserDto', createRedisUserDto);
    return this.client.send('add.new', createRedisUserDto);
  }

  @Get()
  findAll(@Req() request) {
    return this.client.send('get.list', request.query);
  }
}
