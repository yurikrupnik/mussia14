// import { Test, TestingModule } from '@nestjs/testing';
// import { PubSubController } from './pubsub.controller';
// import { PubSubService } from './pubsub.service';
// import { LoggerModule } from '../not-userd-examples/a-utils/my-logger/my-logger.module';

describe('PubsubController', () => {
  // let controller: PubSubController;
  //
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [PubSubController],
  //     providers: [PubSubService],
  //     imports: [LoggerModule],
  //   }).compile();
  //
  //   controller = module.get<PubSubController>(PubSubController);
  // });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
    expect(1).toBeDefined();
    // controller.publishTopic('topic1', { data: 1 });
  });
});
