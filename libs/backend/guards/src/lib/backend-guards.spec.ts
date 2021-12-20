import { Auth, RolesGuard } from './backend-guards';

describe('backendGuards', () => {
  it('should work', () => {
    expect(Auth()).toBeDefined();
    expect(RolesGuard).toBeDefined();
  });
});
