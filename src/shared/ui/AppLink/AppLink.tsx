import { FC, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';

export enum AppLinkColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  children?: React.ReactNode;
  color?: AppLinkColor;
  to: string;
}

export const AppLink: FC<AppLinkProps> = memo((props) => {
  const { className = '', children, to, color = AppLinkColor.PRIMARY, ...otherProps } = props;

  const mods: Mods = {
    [cls[color]]: true,
  };

  return (
    <Link to={to} className={classNames(cls.AppLink, mods, [className])} {...otherProps}>
      {children}
    </Link>
  );
});
