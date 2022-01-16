import { clientFirebase } from './client-firebase';

describe('clientFirebase', () => {
  it('should work', () => {
    expect(clientFirebase()).toEqual('client-firebase');
  });
});
