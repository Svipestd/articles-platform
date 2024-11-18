import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  children?: React.ReactNode;
  theme?: AppLinkTheme;
  to: string;
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const { className, children, to, theme = AppLinkTheme.PRIMARY, ...otherProps } = props;

  return (
    <Link to={to} className={classNames(cls.AppLink, {}, [className, cls[theme]])} {...otherProps}>
      {children}
    </Link>
  );
};
