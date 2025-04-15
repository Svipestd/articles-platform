import { CSSProperties, FC, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Divider.module.scss';

export enum DividerSize {
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
}

interface DividerProps {
  className?: string;
  children?: React.ReactNode;
  size?: DividerSize;
  isLine?: boolean;
}

export const Divider: FC<DividerProps> = memo((props) => {
  const { className = '', size = DividerSize.M, isLine = true } = props;

  const mods: Mods = {
    [cls[size]]: true,
    [cls['isLine']]: isLine,
  };

  return <div className={classNames(cls.Divider, mods, [className])}></div>;
});
