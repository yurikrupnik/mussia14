import { PartialType } from '@nestjs/swagger';
import { CreateRedisUserDto } from './create-redis-user.dto';

export class UpdateRedisUserDto extends PartialType(CreateRedisUserDto) {}
