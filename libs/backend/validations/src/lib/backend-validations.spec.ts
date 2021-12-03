import { ValidationPipe } from './backend-validations';

describe('ValidationPipe', () => {
  it('should be defined', () => {
    expect(new ValidationPipe()).toBeDefined();
  });
});
