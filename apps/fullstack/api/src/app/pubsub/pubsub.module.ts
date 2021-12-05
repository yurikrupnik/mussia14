import { Module, Logger } from '@nestjs/common';
import { PubSubService } from './pubsub.service';
import { PubSubController } from './pubsub.controller';
import { LoggerModule } from '../a-utils/my-logger/my-logger.module';

@Module({
  imports: [LoggerModule],
  // exports: [LoggerModule],
  controllers: [PubSubController],
  providers: [PubSubService],
})
export class PubSubModule {}
