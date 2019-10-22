export function checkTypeAndRegex(dataPropValue, schemaPropValue, propString) {
  let violations = '';

  if (!dataPropValue || !schemaPropValue) {
    return;
  }

  if (
    schemaPropValue.type
    && typeof dataPropValue !== schemaPropValue.type
  ) {
    violations += `for ${propString} expected ${
      schemaPropValue.type
      } but got ${typeof dataPropValue}`;
  } else if (
    schemaPropValue.hasOwnProperty('regex')
    && !schemaPropValue.regex.test(dataPropValue)
  ) {
    violations += `expected ${propString} to match ${schemaPropValue.regex}`;
  }

  return violations;
}

export function validator(eventSchema, eventData) {
  const violations = [];

  if (!eventSchema || !eventData) {
    return;
  }

  function doValidation(schema, data, parentNode) {
    const expectedProps = Object.keys(schema);
    const receivedProps = Object.keys(data);

    receivedProps.forEach((receivedProp) => {
      if (expectedProps.indexOf(receivedProp) === -1) {
        violations.push(
          `unexpected prop ${receivedProp}${
          parentNode ? ` from ${parentNode}` : ''
          }`
        );
      }
    });

    expectedProps.forEach((expectedProp) => {
      const schemaPropValue = schema[expectedProp];
      const dataPropValue = data && data[expectedProp];
      const isDataPropValueArray = Array.isArray(dataPropValue);
      const propString = `${parentNode ? `${parentNode}.` : ''}${expectedProp}`;
      const isRequired = !schemaPropValue.hasOwnProperty('optional');

      if (isRequired && typeof dataPropValue === 'undefined') {
        violations.push(
          `missing ${expectedProp}${parentNode ? ` from ${parentNode}` : ''}`
        );
      } else if (schemaPropValue.hasOwnProperty('type')) {
        const check = checkTypeAndRegex(dataPropValue, schemaPropValue, propString);
        if (check) {
          violations.push(check);
        }
        if (isDataPropValueArray) {
          dataPropValue.forEach((prop) => {
            if (schemaPropValue.arrayItem.itemSchema) {
              doValidation(
                schemaPropValue.arrayItem.itemSchema,
                prop,
                expectedProp
              );
            }
            const check = checkTypeAndRegex(prop, schemaPropValue.arrayItem, propString);
            if (check) {
              violations.push(check);
            }
          });
        }
      } else {
        doValidation(schemaPropValue, dataPropValue, propString);
      }
    });
  }

  doValidation(eventSchema, eventData);

  return new Promise(((resolve, reject) => {
    if (violations.length) {
      resolve(violations);
    } else {
      reject('no schema violations occured');
    }
  }));
}
