import { Test, TestingModule } from '@nestjs/testing';
import { RedisUserController } from './redis-user.controller';
import { RedisUserService } from './redis-user.service';

describe('RedisUserController', () => {
  let controller: RedisUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedisUserController],
      providers: [RedisUserService],
    }).compile();

    controller = module.get<RedisUserController>(RedisUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
