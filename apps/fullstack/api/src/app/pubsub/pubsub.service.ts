import {
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
// import { HttpAdapterHost } from '@nestjs/core';
// import { CreateBiDto } from './dto/create-bi.dto';
// import { UpdateBiDto } from './dto/update-bi.dto';
// import { ConfigService } from '@nestjs/config';
import { PubSub } from '@google-cloud/pubsub';
import { MyLogger } from '../a-utils/my-logger/my-logger.service';

const pubsub = new PubSub();

type events = 'event1' | 'event2';

// todo remove duplicated
enum myEvents {
  event1 = 'event1',
  event2 = 'event2',
}

@Injectable()
export class PubSubService {
  constructor(private logger: MyLogger) {
    this.logger.setContext(PubSubService.name);
  }

  publishTopic(topic: myEvents, message: any): Promise<[string] | Error> {
    // this.logger.log('topic', topic);
    const buffer = Buffer.from(JSON.stringify(message));
    return pubsub
      .topic(topic)
      .publishMessage({ data: buffer })
      .catch((err) => {
        const { code } = err;
        if (code === 5) {
          throw new NotFoundException(err.details);
        } else if (code === 3) {
          throw new NotAcceptableException(err.details);
        }
        throw new InternalServerErrorException(err);
      });
  }

  doSomething() {
    this.logger.log('all good here');
    return 'div is here';
  }
}
