import { mongoConfig } from './backend-envs';
import faker from 'faker';

describe('mongoConfig', () => {
  it('get default value', () => {
    expect(mongoConfig().MONGO_URI).toEqual('mongodb://localhost/mussia12');
  });

  it('get env value', () => {
    const mockUrl = faker.internet.url(); // tod use faker
    process.env.MONGO_URI = mockUrl;
    expect(mongoConfig().MONGO_URI).toEqual(mockUrl);
  });
});
