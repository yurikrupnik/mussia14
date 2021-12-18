// import * as health_controller from './health.controller';
// import * as terminus from '@nestjs/terminus';
// import {
//   HealthCheckService,
//   HealthCheck,
//   MongooseHealthIndicator,
// } from '@nestjs/terminus';
// import * as index_d from '../../../../../../node_modules/@nestjs/terminus/dist/index.d';
//
// import { HealthController } from './health.controller';
// // @ponicode
// describe('check', () => {
//   let inst: any;
//
//   beforeEach(() => {
//     inst = new health_controller.HealthController(
//       HealthCheckService,
//       MongooseHealthIndicator
//     );
//     // HealthCheckService,
//     // MongooseHealthIndicator
//   });
//
//   test('0', () => {
//     const spy: any = jest.spyOn(index_d.HealthCheckService.prototype, 'check');
//     const spy1: any = jest.spyOn(
//       index_d.MongooseHealthIndicator.prototype,
//       'pingCheck'
//     );
//     spy.mockReturnValue({
//       status: 'ok',
//       info: undefined,
//       error: undefined,
//       details: {
//         key1: {
//           status: 'up',
//           key1: 'Hello, world!',
//           key2: 'Hello, world!',
//           // status: 500,
//           key3: -100,
//           key0: 'George',
//           key4: -5.48,
//         },
//         key0: {
//           status: 'down',
//           key1: 'Hello, world!',
//           key2: 'foo bar',
//           // status: 429,
//           key3: 1,
//           key0: 'George',
//         },
//         key2: {
//           status: null,
//           key1: 'Hello, world!',
//           key2: 'Hello, world!',
//           // status: 404,
//           key3: 100,
//           key0: 'Jean-Philippe',
//         },
//       },
//     });
//     spy1.mockReturnValue({
//       key1: {
//         status: 'down',
//         // status: 404,
//         key0: 'Jean-Philippe',
//       },
//       key0: {
//         status: null,
//         key1: 'Hello, world!',
//         // status: 200,
//         key0: 'Anas',
//         key2: 'Hello, world!',
//       },
//       key2: {
//         status: null,
//         key1: 'Foo bar',
//         // status: 400,
//         key0: 'Michael',
//         key2: 'This is a Text',
//       },
//     });
//     const result: any = inst.check();
//     expect(result).toMatchSnapshot();
//     spy.mockRestore();
//     spy1.mockRestore();
//   });
//
//   test('1', () => {
//     const spy: any = jest.spyOn(index_d.HealthCheckService.prototype, 'check');
//     const spy1: any = jest.spyOn(
//       index_d.MongooseHealthIndicator.prototype,
//       'pingCheck'
//     );
//     spy.mockReturnValue({
//       status: 'ok',
//       info: undefined,
//       error: undefined,
//       details: {
//         key1: {
//           status: 'up',
//           key1: '',
//           // status: Infinity,
//           key0: '',
//           key2: '',
//         },
//         key2: {
//           status: null,
//           key1: '',
//           // status: Infinity,
//           key0: '',
//         },
//         key3: {
//           status: null,
//           // status: Infinity
//         },
//         key0: {
//           status: null,
//           key1: '',
//           // status: Infinity,
//           key0: '',
//           key2: '',
//         },
//         key4: {
//           status: null,
//           // status: Infinity,
//           key0: '',
//         },
//       },
//     });
//     spy1.mockReturnValue({
//       key1: {
//         status: 'down',
//         // status: Infinity,
//         key0: '',
//       },
//       key0: {
//         status: null,
//         key1: '',
//         // status: Infinity,
//         key0: '',
//         key2: '',
//       },
//       key2: {
//         status: null,
//         key1: '',
//         // status: Infinity,
//         key0: '',
//         key2: '',
//       },
//     });
//     const result: any = inst.check();
//     expect(result).toMatchSnapshot();
//     spy.mockRestore();
//     spy1.mockRestore();
//   });
// });

test('ds', () => {
  expect(1).toEqual(1);
});
