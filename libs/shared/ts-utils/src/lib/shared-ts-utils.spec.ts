import { randomEnum } from './shared-ts-utils';

describe('sharedTsUtils', () => {
  enum TestEnum {
    ADMIN = 'admin',
    CLIENT = 'client',
    FINANCE = 'FINANCE',
  }
  it('should work', () => {
    expect(randomEnum(TestEnum)).toBeDefined();
    expect(randomEnum(TestEnum)).toBeTruthy();
  });
});
