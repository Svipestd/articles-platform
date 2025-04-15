import { FC, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

interface LoaderProps {
  className?: string;
  children?: React.ReactNode;
  center?: boolean;
}

export const Loader: FC<LoaderProps> = memo((props) => {
  const { className = '', center = false } = props;

  const mods: Mods = {
    [cls.center]: center,
  };

  return (
    <div className={classNames(cls.Loader, mods, [className])}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
});
