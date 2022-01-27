import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { Client, ClientTCP, Transport } from '@nestjs/microservices';
import os from 'os';

const hostname = os.hostname();

@Controller('tcp-user')
export class TcpUserController {
  // constructor(private readonly redisUserService: RedisUserService) {}

  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.HOST || '0.0.0.0',
      port: 3000,
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
    console.log('os hostname', hostname);
    return this.client.send('get.list', request.query);
  }
}
