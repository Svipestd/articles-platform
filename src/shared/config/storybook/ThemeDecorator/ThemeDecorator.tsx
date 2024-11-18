import { Theme } from '@/app/providers/ThemeProvider';

export const themeGlobalType = {
  name: 'Theme',
  description: 'Global theme for components',
  defaultValue: Theme.LIGHT,
  toolbar: {
    title: 'Theme',
    icon: 'circlehollow',
    items: [
      { value: Theme.LIGHT, icon: 'circlehollow', title: 'Light' },
      { value: Theme.DARK, icon: 'circle', title: 'Dark' },
    ],
    dynamicTitle: true,
  },
};

export const ThemeDecorator = () => (Story: any, context: any) => {
  const { theme } = context.globals;

  return (
    <div className={`app ${theme}`}>
      <Story />
    </div>
  );
};
