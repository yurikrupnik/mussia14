import { backendLogger } from './backend-logger';

describe('backendLogger', () => {
  it('should work', () => {
    expect(backendLogger()).toEqual('backend-logger');
  });
});
