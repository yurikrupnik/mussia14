import { Module } from '@nestjs/common';
// import { PubSubService } from './kafka.service';
import { KafkaController } from './kafka.controller';

@Module({
  controllers: [KafkaController],
  // providers: [KafkaService],
})
export class KafkaModule {}
