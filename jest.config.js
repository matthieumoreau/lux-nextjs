const { resolve } = require('path');

module.exports = {
  name: 'lux-residence',
  verbose: true,

  //   coverageThreshold: {
  //     global: {
  //       statements: 52,
  //       branches: 36,
  //       functions: 49,
  //       lines: 53,
  //     },
  //   },

  testEnvironment: 'node',
  preset: 'ts-jest',
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@tests/(.*)$': resolve(__dirname, './tests/$1'),
    '^@interfaces/(.*)$': resolve(__dirname, './interfaces/$1'),
    '^@i18n$': resolve(__dirname, './server/config/i18n/index.ts'),
    '^@components/(.*)$': resolve(__dirname, './src/components/$1'),
    '^@store/(.*)$': resolve(__dirname, './src/store/$1'),
    '^@utils/(.*)$': resolve(__dirname, './utils/$1'),
    '^@config/(.*)$': resolve(__dirname, './config/$1'),
    '^@lib/(.*)$': resolve(__dirname, './lib/$1'),
    '^@pages/(.*)$': resolve(__dirname, './pages/$1'),
    '^@server/(.*)$': resolve(__dirname, './server/$1'),
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/.build/',
    '<rootDir>/.public/',
    '<rootDir>/node_modules/',
  ],
  //   snapshotSerializers: ['enzyme-to-json/serializer'],

  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'jest unit',
        outputDirectory: 'tests/unit/reports',
        outputName: './results.xml',
        suiteNameTemplate: '{filename}',
        classNameTemplate: '{filename}.{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' › ',
      },
      'jest-sonar',
      {
        outputDirectory: 'coverage',
        outputName: 'sonar-report.xml',
      },
    ],
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.tsx',
    '!src/**/*.types.ts',
    'server/**/*.ts',
  ],
  coverageDirectory: 'tests/unit/reports/coverage',
  coverageReporters: ['html'],

  // https://github.com/zeit/next.js/issues/8663#issue-490553899
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires. you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.test.json',
    },
  },
};
