import { FC } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ThemeSwitcher.module.scss'
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import LightThemeIcon from '@/shared/assets/icons/themes/light-theme.svg'
import DarkThemeIcon from '@/shared/assets/icons/themes/dark-theme.svg'
import { Button, ThemeButton } from '@/shared/ui/Button/Button';


interface ThemeSwitcherProps {
  className?: string,
  children?: React.ReactNode,
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
  const { className } = props

  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      className={classNames(cls.ThemeSwitcher, {}, [className, cls.icon])}
      theme={ThemeButton.CLEAR}
      onClick={toggleTheme}
    > 
      {theme === Theme.LIGHT ? <LightThemeIcon /> : <DarkThemeIcon /> }
    </Button>
  );
};