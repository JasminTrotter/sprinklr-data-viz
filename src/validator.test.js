import * as validatorModule from './validator';

describe('validator', () => {
  test('should not throw error', () => {
    expect.assertions(1);
    const validatorStub = jest.spyOn(validatorModule, 'validator');

    validatorModule.validator();
    expect(validatorStub).not.toThrow();
  })
});
