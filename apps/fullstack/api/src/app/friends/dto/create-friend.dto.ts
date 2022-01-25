import { OmitType } from '@nestjs/swagger';
import { Friend } from '../entities/friend.entity';

export class CreateFriendDto extends OmitType(Friend, ['_id'] as const) {}
