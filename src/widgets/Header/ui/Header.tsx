import { FC, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/providers/StoreProvider';
import {
  authActions,
  authSelectors,
  authThunks,
} from '@/app/model/auth/slices/authSlice/authSlice';
import { LanguageSwitcher } from '@/features/Language/LanguageSwitcher';
import { ThemeSwitcher } from '@/features/Theme/ThemeSwitcher';

interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export const Header: FC<HeaderProps> = memo((props) => {
  const { className = '' } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const authUser = useSelector(authSelectors.selectUser);

  const onLogin = useCallback(() => {
    dispatch(authActions.setIsShowLogin(true));
  }, [dispatch]);

  const onLogout = useCallback(() => {
    dispatch(authThunks.logoutUserThunk());
  }, [dispatch]);

  const renderLoginBtn = () => {
    if (authUser) {
      return <Button onClick={onLogout}>{t('HEADER.ACTIONS.logout')}</Button>;
    }

    return <Button onClick={onLogin}>{t('HEADER.ACTIONS.login')}</Button>;
  };

  return (
    <header className={classNames(cls.Header, {}, [className])}>
      <div className={cls.actions}>
        <div className={cls.switchers}>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>

        {renderLoginBtn()}
      </div>
    </header>
  );
});
