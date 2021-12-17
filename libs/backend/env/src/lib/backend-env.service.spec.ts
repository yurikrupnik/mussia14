import { Test } from '@nestjs/testing';
import { BackendEnvService } from './backend-env.service';

describe('BackendEnvService', () => {
  let service: BackendEnvService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendEnvService],
    }).compile();

    service = module.get(BackendEnvService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
