import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

interface IPost {
  title: string;
  description: string;
}

@Controller('posts')
export class PostsController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'posts',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'posts-consumer',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('add.new');
    this.client.subscribeToResponseOf('get.list');

    await this.client.connect();
  }

  @Post('/')
  appPost(@Body() post: IPost) {
    return this.client.send('add.new', post);
  }

  @Get('/')
  getList(@Req() request) {
    return this.client.send('get.list', request.query);
  }
}
