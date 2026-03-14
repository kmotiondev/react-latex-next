/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    // stub CSS imports so Jest doesn't choke on them
    '\\.css$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  testMatch: ['**/*.test.tsx', '**/*.test.ts', '**/*.test.js'],
};
