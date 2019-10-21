const choreoSchema = {
  speed: { type: 'number' },
  bodyHalf: { type: 'string', optional: true, regex: new RegExp(/^left|right$/) },
  bodyPart: { type: 'string', regex: new RegExp(/^head|arm|hand|torso|hip|leg|foot$/) }
};

const nameSchema = {
  first: { type: 'string' },
  last: { type: 'string' },
};

export const dancerSchema = {
  name: nameSchema,
  genre: { type: 'string' },
  level: { type: 'string', regex: new RegExp(/^beginner|intermediate|advanced$/) },
  isSoloist: { type: 'boolean' },
  choreography: { type: 'object', arrayItem: { itemSchema: choreoSchema } }
};

export const goodData = {
  name: {
    first: 'Jasmin',
    last: 'Trotter'
  },
  genre: 'ballet',
  level: 'advanced',
  isSoloist: true,
  choreography: [
    {
      speed: 5,
      bodyHalf: 'right',
      bodyPart: 'foot'
    },
    {
      speed: 3,
      bodyHalf: 'left',
      bodyPart: 'hand'
    },
    {
      speed: 10,
      bodyPart: 'leg'
    }
  ]
};

export const badData = {
  name: {
    first: 'Joe Shmoe'
  },
  level: 'not actual dancer',
  isDancer: false,
  isSoloist: 'no way!',
  choreography: [
    {
      speed: 1,
      bodyHalf: 'left',
      bodyPart: 'foot'
    },
    {
      speed: 1,
      bodyHalf: 'left',
      bodyPart: 'foot'
    }
  ]
};
