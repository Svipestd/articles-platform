import { FC, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { useTranslation } from 'react-i18next';
import AvatarDefault from '@/shared/assets/images/avatarDefault.png';

export enum AvatarSize {
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
}

interface AvatarProps {
  className?: string;
  children?: React.ReactNode;
  src: string | null;
  alt?: string;
  size?: AvatarSize;
}

export const Avatar: FC<AvatarProps> = memo((props) => {
  const { className = '', src, size = AvatarSize.M, alt = '' } = props;
  const { t } = useTranslation();

  const mods: Mods = {
    [cls[size]]: true,
  };

  return (
    <img
      className={classNames(cls.Avatar, mods, [className])}
      src={src || AvatarDefault}
      alt={alt}
    ></img>
  );
});
