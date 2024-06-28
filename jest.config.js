module.exports = {
  testEnvironment: "node",
  coverageDirectory: "coverage",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/dist/**",
  ],
};
