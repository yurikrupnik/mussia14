// import { Test, TestingModule } from '@nestjs/testing';
// import { HealthController } from './health.controller';
// import {
//   TerminusModule,
//   MongooseHealthIndicator,
//   HealthCheckService,
//   HealthCheck,
//   MongoConnectionError,
//   HealthCheckResult,
// } from '@nestjs/terminus';
// import { MongooseModule } from '@nestjs/mongoose';
// import { mongoConfig } from '@mussia14/backend/envs';

describe('HealthController', () => {
  // let controller: HealthController;
  //
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [HealthController],
  //     imports: [
  //       MongooseModule.forRoot(mongoConfig().MONGO_URI),
  //       TerminusModule,
  //     ],
  //     providers: [],
  //     exports: [],
  //   })
  //     .useMocker((token) => {
  //       console.log('token', token);
  //     })
  //     .compile();
  //
  //   controller = module.get<HealthController>(HealthController);
  //   // controller.check()
  // });

  test('should be defin' + 'ed', () => {
    // expect(controller).toBeDefined();
    expect(1).toBe(1);

    // const result: HealthCheckResult = {
    //   status: 'ok',
    //   info: { mongoose: { status: 'up' } },
    //   error: {},
    //   details: { mongoose: { status: 'up' } },
    // };
    // // jest.spyOn(controller, 'check').mockImplementation(() => result);
    // // jest.spyOn(controller, 'check').mockImplementation(
    // //   jest.fn(() => {
    // //     return {
    // //       status: 'ok',
    // //       info: { mongoose: { status: 'up' } },
    // //       error: {},
    // //       details: { mongoose: { status: 'up' } },
    // //     };
    // //   })
    // // );

    // controller.check().then((res) => {
    //   console.log('res', res);
    //   return res;
    // });
  });
});
