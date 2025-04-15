import type { Config } from 'jest';
import path from 'path';
import { BuildProject } from '../build/types/config';

const config: Config = {
  globals: {
    __IS_DEV__: true,
    __API__: '',
    __PROJECT__: BuildProject.JEST,
  },
  testEnvironment: 'jsdom',
  clearMocks: true,
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],
  rootDir: '../../',
  testMatch: ['<rootDir>/src/**/*(*.)@(spec|test).[tj]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/jestSetup.ts'],
  moduleNameMapper: {
    '\\.(svg)$': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
    '\\.(s?css)$': 'identity-obj-proxy',
    '@/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
