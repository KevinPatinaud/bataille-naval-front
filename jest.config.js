module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/app/**/*.{ts,tsx}'
      ],
      coverageThreshold: {
        global: {
          branches:90,
          functions:90,
          lines: 90,
          statements:90
        }
      },
  
    coverageReporters: ['html'],
    coverageDirectory: 'coverage/bataille-navale',
    moduleNameMapper: {
        "^src/(.*)$": "<rootDir>/src/$1",
      }
  };