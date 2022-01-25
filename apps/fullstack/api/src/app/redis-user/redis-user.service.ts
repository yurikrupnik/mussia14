import { Injectable } from '@nestjs/common';
import { CreateRedisUserDto } from './dto/create-redis-user.dto';
import { UpdateRedisUserDto } from './dto/update-redis-user.dto';

@Injectable()
export class RedisUserService {
  create(createRedisUserDto: CreateRedisUserDto) {
    return 'This action adds a new redisUser';
  }

  findAll() {
    return `This action returns all redisUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} redisUser`;
  }

  update(id: number, updateRedisUserDto: UpdateRedisUserDto) {
    return `This action updates a #${id} redisUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} redisUser`;
  }
}
