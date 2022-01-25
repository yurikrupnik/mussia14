import { Test, TestingModule } from '@nestjs/testing';
import { RedisUserService } from './redis-user.service';

describe('RedisUserService', () => {
  let service: RedisUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisUserService],
    }).compile();

    service = module.get<RedisUserService>(RedisUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
