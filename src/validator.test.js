import { validator } from './validator';

describe('validator', () => {
  test('should not throw error', () => {
    expect.assertions(1);

    expect(() => validator()).not.toThrow();
  });
  test('should return violation when data has unexpected prop', () => {
    expect.assertions(1);

    validator({}, { whoa: 'yikes' }).then(result => {
      expect(result).toBe(['unexpected prop whoa']);
    });
  });
  test('should return violation when missing required prop', () => {
    expect.assertions(1);
    const data = {
      that: {}
    };
    const schema = {
      that: {
        this: true
      }
    };

    validator(schema, data).then(result => {
      expect(result).toBe(['missing this from that'])
    });
  });
  test.skip('should return no violations if data passes validation', () => {
    expect.assertions(1);

    const data = {
      foo: 'bar',
      biz: 'bang',
      ho: {
        hum: false
      },
      list: [
        {
          listItem: 10
        }
      ]
    };
    const schema = {
      foo: { type: 'string' },
      biz: { type: 'string', test: new RegExp(/^bang$/i) },
      ho: {
        hum: { type: 'boolean' }
      },
      list: {
        type: 'object',
        arrayItem: {
          type: 'object',
          itemSchema: {
            listItem: { type: 'number' }
          }
        }
      },
      maybe: { type: 'string', optional: true }
    };

    expect(validator(schema, data)).rejects.toMatch('no schema violations occured');
  });
});
