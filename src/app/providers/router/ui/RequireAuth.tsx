import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RoutePath } from '../config/routeConfig';
import { authSelectors } from '@/app/model/auth/slices/authSlice/authSlice';

interface RequireAuthProps {
  className?: string;
  children?: React.ReactNode;
}

export const RequireAuth: FC<RequireAuthProps> = memo((props) => {
  const { children } = props;
  const authUser = useSelector(authSelectors.selectUser);

  if (!authUser) return <Navigate to={RoutePath.main} replace></Navigate>;

  return children;
});
