import {
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';

const pubsub = new PubSub();

type events = 'event1' | 'event2';

// todo remove duplicated
enum myEvents {
  event1 = 'event1',
  event2 = 'event2',
}

@Injectable()
export class PubSubService {
  constructor(private logger: Logger) {}

  publishTopic(topic: myEvents, message: any): Promise<[string]> {
    this.logger.log('topic', topic);
    // todo check pipevalidation for body to catch those errors
    if (!topic) {
      throw new NotAcceptableException('no topic provided');
    }
    if (!message) {
      throw new NotAcceptableException('no message provided');
    }

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
