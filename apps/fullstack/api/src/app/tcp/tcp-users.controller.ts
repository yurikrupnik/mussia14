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
    // return { ad: 's' };
    return this.client.send('add.new', createRedisUserDto);
    // return this.redisUserService.create(createRedisUserDto);
  }

  @Get()
  findAll(@Req() request) {
    return this.client.send('get.list', request.query);
    // return this.redisUserService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.redisUserService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateRedisUserDto: UpdateRedisUserDto
  // ) {
  //   return this.redisUserService.update(+id, updateRedisUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.redisUserService.remove(+id);
  // }
}
