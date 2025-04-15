import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { buildCssLoaders } from '../build/loaders/buildCssLoaders';
import { buildSvgLoaders } from '../build/loaders/buildSvgLoaders';
import CopyPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';
import { BuildProject } from '../build/types/config';

const config: StorybookConfig = {
  stories: ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [...buildCssLoaders(true)],
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  core: {
    disableTelemetry: true,
  },
  webpackFinal: async (config) => {
    // Add alias support
    config.resolve!.extensions = ['.tsx', '.ts', '.js'];
    config.resolve!.alias = {
      '@': path.resolve(__dirname, '..', '..', 'src'),
    };

    // Exclude existing svg loaders
    config.module!.rules = config.module!.rules!.map((rule: any) => {
      if (/svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i };
      }

      return rule;
    });

    // Add svg loaders
    config.module!.rules!.push(...buildSvgLoaders());

    // Copy translations to storybook public folder
    config.plugins!.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '..', '..', 'public', 'locales'),
            to: path.resolve(config.output!.path!, 'locales'),
          },
        ],
      })
    );

    // Add env variables
    config.plugins!.push(
      new webpack.DefinePlugin({
        __IS_DEV__: true,
        __API__: JSON.stringify(''),
        __PROJECT__: JSON.stringify(BuildProject.STORYBOOK),
      })
    );

    return config;
  },
};
export default config;
