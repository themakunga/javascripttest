import { pathsToModuleNameMapper } from 'ts-jest';
import { readFileSync } from 'fs';

const { compilerOptions } = JSON.parse(readFileSync('./tsconfig.json', 'utf8'));

export default {
  projects: [
    {
      displayName: 'Unit Test',
      moduleDirectories: ['node_modules', __dirname],
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
      collectCoverageFrom: ['src/**/*'],
      coverageThreshold: {
        global: {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
      },
      clearMocks: true,
      coverageDirectory: 'coverage',
      coveragePathIgnorePatterns: [
        '/node_modules/',
        '/__fixtures__/',
        '/(__)?test(s__)?/',
        '/(__)?mock(s__)?/',
        '/__jest__/',
        '.?.min.js',
        'interfaces.ts',
      ],
      coverageProvider: 'v8',
      presets: 'ts-jest',
      rootDir: 'src',
      setupFilesAfterEnv: ['dotenv/config'],
      testEnvironment: 'node',
      testRegex: '\\.spec\\.ts$',
    },
    {
      displayName: 'E2E Test',
      moduleDirectories: ['node_modules', __dirname],
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
      preset: 'ts-jest',
      rootDir: 'test',
      setupFilesAfterEnv: ['dotenv/config'],
      testEnvironment: 'node',
      testRegex: '\\.end2end.spec\\.ts$',
    },
  ],
};
