import { validator } from './validator';

describe('validator', () => {
  test('should not throw error', () => {
    expect.assertions(1);

    expect(() => validator()).not.toThrow();
  })
});
