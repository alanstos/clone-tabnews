/* eslint-disable no-unused-vars */
require("dotenv").config({
  path: ".env.development",
});

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const _config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

const config = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000, //1min
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const jestConfig = createJestConfig(config);
module.exports = jestConfig;
