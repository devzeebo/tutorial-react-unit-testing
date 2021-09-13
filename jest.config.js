const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  clearMocks: true,
  roots: [
    './src',
  ],
  collectCoverageFrom: [
    './src/**/*.ts',
    './src/**/*.tsx',
    '!./src/**/styles.ts',
    '!./src/**/index.ts',
    '!./**/*.d.ts',
  ],
  coverageDirectory: './.build/coverage',
};
