import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
    "@/(.*)": "<rootDir>/app/$1"
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts"],
  modulePathIgnorePatterns: ["<rootDir>/__tests__/__mocks__/"]
};

export default config;
