import { PartialType } from '@nestjs/swagger';
import { CreatePubsubDto } from './create-pubsub.dto';

export class UpdatePubsubDto extends PartialType(CreatePubsubDto) {}
