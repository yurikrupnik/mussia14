import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { CreateRedisUserDto } from './dto/create-redis-user.dto';
import { Client, ClientRedis, Transport } from '@nestjs/microservices';

@Controller('redis-user')
export class RedisUserController {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_URL
        ? process.env.REDIS_URL
        : // `redis://${process.env.REDIS_URL}:${process.env.REDIS_PORT}` ||
          'redis://localhost:6379',
    },
    // options: {
    //   url:
    //     `redis://${process.env.REDIS_URL}:${process.env.REDIS_PORT}` ||
    //     'redis://localhost:6379',
    // },
  })
  client: ClientRedis;

  @Post('')
  create(@Body() createRedisUserDto: CreateRedisUserDto) {
    return this.client.send('add.new', createRedisUserDto);
  }

  @Get()
  findAll(@Req() request) {
    return this.client.send('get.list', request.query);
  }
}
