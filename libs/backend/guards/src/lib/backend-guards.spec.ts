import { backendGuards } from './backend-guards';

describe('backendGuards', () => {
  it('should work', () => {
    expect(backendGuards()).toEqual('backend-guards');
  });
});
