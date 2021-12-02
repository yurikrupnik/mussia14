const { testEnvironment, ...nxPreset } = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  preset: 'jest-playwright-preset',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.e2e.json',
    },
  },
  displayName: 'fullstack-webclient-playwright',
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['chromium'],
    },
  },
};
