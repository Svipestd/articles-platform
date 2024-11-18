import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { AppRoutes, RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  className?: string;
  children?: React.ReactNode;
}

export const Navbar: FC<NavbarProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        <AppLink to={RoutePath[AppRoutes.MAIN]} theme={AppLinkTheme.SECONDARY}>
          {t('NAVBAR.main')}
        </AppLink>
        <AppLink to={RoutePath[AppRoutes.ABOUT]} theme={AppLinkTheme.SECONDARY}>
          {t('NAVBAR.about')}
        </AppLink>
      </div>
    </div>
  );
};
