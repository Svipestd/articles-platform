import type { Preview } from '@storybook/react';
import {
  ThemeDecorator,
  themeGlobalType,
} from './../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StyleDecorator } from './../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { RouterDecorator } from './../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import {
  I18nDecorator,
  localeGlobalType,
} from './../../src/shared/config/storybook/I18nDecorator/I18nDecorator';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: themeGlobalType,
    locale: localeGlobalType,
  },
  decorators: [StyleDecorator, ThemeDecorator(), RouterDecorator, I18nDecorator],
};

export default preview;
