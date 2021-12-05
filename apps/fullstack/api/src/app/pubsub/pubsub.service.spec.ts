import { Test, TestingModule } from '@nestjs/testing';
import { PubSubService } from './pubsub.service';
import { LoggerModule } from '../a-utils/my-logger/my-logger.module';

describe('PubsubService', () => {
  let service: PubSubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubSubService],
      imports: [LoggerModule],
    }).compile();

    service = module.get<PubSubService>(PubSubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
