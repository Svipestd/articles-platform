import { FC, memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from '@/app/providers/Router/config/routeConfig';
import { PageLoader } from '@/shared/ui/PageLoader/ui/PageLoader';
import { RequireAuth } from './RequireAuth';

interface AppRouterProps {
  className?: string;
  children?: React.ReactNode;
}

export const AppRouter: FC<AppRouterProps> = memo(() => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly ? <RequireAuth>{route.element}</RequireAuth> : route.element}
      />
    );
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Suspense>
  );
});
