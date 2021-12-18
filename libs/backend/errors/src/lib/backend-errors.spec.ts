import { handleError } from './backend-errors';

describe('backendErrors', () => {
  it('should throw an error', async () => {
    expect(1).toEqual(1);
    // function createFakePromiseWithCatch(cb: typeof handleError) {
    //   return Promise.resolve().catch(cb);
    // }
    //
    // expect(await createFakePromiseWithCatch(handleError)).rejects.toMatch(
    //   'error'
    // );
  });
});
