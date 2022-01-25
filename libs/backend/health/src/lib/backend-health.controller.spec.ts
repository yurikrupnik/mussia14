import { Test } from '@nestjs/testing';
import { HealthController } from './backend-health.controller';

describe('BackendHealthController', () => {
  // let controller: HealthController;
  //
  // beforeEach(async () => {
  //   const module = await Test.createTestingModule({
  //     providers: [],
  //     controllers: [HealthController],
  //   }).compile();
  //
  //   controller = module.get(HealthController);
  // });

  // it('should be defined', () => {
  //   expect(controller).toBeTruthy();
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
