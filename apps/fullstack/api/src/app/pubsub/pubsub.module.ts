import { Module } from '@nestjs/common';
import { PubSubService } from './pubsub.service';
import { PubSubController } from './pubsub.controller';

@Module({
  controllers: [PubSubController],
  providers: [PubSubService],
})
export class PubSubModule {}
