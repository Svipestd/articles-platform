import { createContext } from 'react';

export enum Theme {
  LIGHT = 'app-theme-light',
  DARK = 'app-theme-dark',
}

export interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: Theme.LIGHT,
  setTheme: () => {},
});
