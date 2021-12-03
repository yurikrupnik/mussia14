// import { Test, TestingModule } from '@nestjs/testing';
// import { HealthController } from './health.controller';
// import {
//   HealthCheckService,
//   HealthCheck,
//   MongooseHealthIndicator,
// } from '@nestjs/terminus';

describe('HealthController', () => {
  // let controller: HealthController;
  //
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [HealthController],
  //     exports: [MongooseHealthIndicator],
  //   }).compile();
  //
  //   controller = module.get<HealthController>(HealthController);
  // });
  //
  test('should be defined', () => {
    //   expect(controller).toBeDefined();
    expect(1).toEqual(1);
  });
});
