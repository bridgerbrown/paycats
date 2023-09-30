/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  verbose: true,
  setupFiles: ["<rootDir>/__test__/setupTests.js"],
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  }
};
module.exports = config;
