import { FC, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './UserAvatar.module.scss';
import { User } from '../../model/types/user';
import { Avatar, AvatarSize } from '@/shared/ui/Avatar/Avatar';
import { Text, TextColor, TextSize } from '@/shared/ui/Text/Text';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export enum UserAvatarSize {
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
}

interface UserAvatarProps {
  className?: string;
  children?: React.ReactNode;
  size?: UserAvatarSize;
  isLink?: boolean;
  user: User | null;
}

export const UserAvatar: FC<UserAvatarProps> = memo((props) => {
  const { className = '', user, size = UserAvatarSize.M, isLink = false } = props;

  const sizes = useMemo(() => {
    if (size === UserAvatarSize.S) {
      return {
        avatarSize: AvatarSize.S,
        usernameSize: TextSize.M,
        emailSize: TextSize.S,
      };
    }

    if (size === UserAvatarSize.L) {
      return {
        avatarSize: AvatarSize.L,
        usernameSize: TextSize.XL,
        emailSize: TextSize.XL,
      };
    }

    return {
      avatarSize: AvatarSize.M,
      usernameSize: TextSize.L,
      emailSize: TextSize.L,
    };
  }, [size]);

  const renderAvatar = () => {
    if (!user) return <Skeleton height={75} width={75} borderRadius="50%" />;

    return <Avatar src={user.avatar} size={sizes.avatarSize} />;
  };

  const renderUsername = () => {
    if (!user) {
      return (
        <>
          <Skeleton height={24} width={200} margin="6px 0" />
        </>
      );
    }

    return (
      <>
        <Text text={user.firstName} size={sizes?.usernameSize} bold />
        <Text text={user.lastName} size={sizes?.usernameSize} bold />
      </>
    );
  };

  const renderEmail = () => {
    if (!user) return <Skeleton height={24} width={100} margin="6px 0" />;

    return <Text text={user.email} size={sizes?.emailSize} color={TextColor.FADED} />;
  };

  const renderContent = () => {
    return (
      <div className={classNames(cls['content-container'])}>
        <div className={cls['avatar-container']}>{renderAvatar()}</div>

        <div className={cls['data-container']}>
          <div className={cls['username']}>{renderUsername()}</div>
          <div className={cls['email']}>{renderEmail()}</div>
        </div>
      </div>
    );
  };

  const renderLinkOuter = () => {
    if (!isLink || !user) return renderContent();

    return <AppLink to={`${RoutePath.profile}/${user.id}`}>{renderContent()}</AppLink>;
  };

  return <div className={classNames(cls.UserAvatar, {}, [className])}>{renderLinkOuter()}</div>;
});
