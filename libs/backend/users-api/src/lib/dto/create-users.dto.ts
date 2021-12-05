import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/users.entity';

export class CreateUserDto extends OmitType(User, ['_id'] as const) {}
