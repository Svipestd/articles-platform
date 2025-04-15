import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import LightThemeIcon from '@/shared/assets/icons/themes/light-theme.svg';
import DarkThemeIcon from '@/shared/assets/icons/themes/dark-theme.svg';
import { Button, ButtonVariant } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';

interface ThemeSwitcherProps {
  className?: string;
  children?: React.ReactNode;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo((props) => {
  const { className = '' } = props;

  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      className={classNames(cls.ThemeSwitcher, {}, [className, cls.icon])}
      variant={ButtonVariant.TEXT}
      onClick={toggleTheme}
    >
      {theme === Theme.LIGHT ? <Icon Svg={LightThemeIcon} /> : <Icon Svg={DarkThemeIcon} />}
    </Button>
  );
});
