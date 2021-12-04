import { Test, TestingModule } from '@nestjs/testing';
import { PubSubController } from './pubsub.controller';
import { PubSubService } from './pubsub.service';

describe('PubsubController', () => {
  let controller: PubSubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PubSubController],
      providers: [PubSubService],
    }).compile();

    controller = module.get<PubSubController>(PubSubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
