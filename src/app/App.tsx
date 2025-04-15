import { FC, Suspense, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from '@/app/providers/Router';
import { Header } from '@/widgets/Header';
import { Sidebar } from '@/widgets/Sidebar';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { LoginUserModal } from '@/features/Login/LoginUser';
import { authActions, authSelectors } from './model/auth/slices/authSlice/authSlice';
import { PageLoader } from '@/shared/ui/PageLoader/ui/PageLoader';
import { appSelectors, appThunks } from './model/app/slices/appSlice/appSlice';
import { dataListManagerActions } from '@/features/DataListManager/model/slices/dataListManagerSlice/dataListManagerSlice';

interface AppProps {
  className?: string;
}

export const App: FC<AppProps> = () => {
  const dispatch = useAppDispatch();

  const appInited = useSelector(appSelectors.selectInited);
  const authIsShowLogin = useSelector(authSelectors.selectIsShowLogin);

  useEffect(() => {
    dispatch(appThunks.initAppThunk());
    dispatch(dataListManagerActions.init());
  }, [dispatch]);

  const onCloseLoginUser = () => {
    dispatch(authActions.setIsShowLogin(false));
  };

  return (
    <div className={classNames('app', {})}>
      <Suspense fallback={''}>
        <Header />

        <div className="content-page">
          <Sidebar />

          {appInited ? <AppRouter /> : <PageLoader />}

          {authIsShowLogin && (
            <LoginUserModal isOpen={authIsShowLogin} onClose={onCloseLoginUser} />
          )}
        </div>
      </Suspense>
    </div>
  );
};
