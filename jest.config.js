module.exports = {
  roots: ['<rootDir>/src'],
  reporters: [
    'default'
  ],
  transform: {
    '^.+\\.js': '<rootDir>/node_modules/babel-jest'
  },
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'jsdom',
  testRegex: '(src)/.*\\.test\\.js$',
  testURL: 'http://localhost'
};
