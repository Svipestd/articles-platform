import { StoreDecorator } from './../../src/shared/lib/storybook/StoreDecorator/StoreDecorator';
import {
  I18nDecorator,
  localeGlobalType,
} from './../../src/shared/lib/storybook/I18nDecorator/I18nDecorator';
import { RouterDecorator } from './../../src/shared/lib/storybook/RouterDecorator/RouterDecorator';
import {
  ThemeDecorator,
  themeGlobalType,
} from './../../src/shared/lib/storybook/ThemeDecorator/ThemeDecorator';
import { StyleDecorator } from './../../src/shared/lib/storybook/StyleDecorator/StyleDecorator';
import type { Preview } from '@storybook/react';

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
  decorators: [StyleDecorator, ThemeDecorator(), I18nDecorator, RouterDecorator],
};

export default preview;
