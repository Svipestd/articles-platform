import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

export const Card: FC<CardProps> = memo((props) => {
  const { className = '', children } = props;

  return <div className={classNames(cls.Card, {}, [className])}>{children}</div>;
});
