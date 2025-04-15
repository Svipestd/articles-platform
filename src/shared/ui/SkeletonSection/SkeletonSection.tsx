import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SkeletonSection.module.scss';
import { Skeleton } from '../Skeleton/Skeleton';

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
  sectionCount?: number;
}

export const SkeletonSection: FC<SkeletonProps> = memo((props) => {
  const { className = '', sectionCount = 3 } = props;

  return (
    <div className={classNames(cls.SkeletonSection, {}, [className])}>
      {Array(sectionCount)
        .fill(0)
        .map((_, index) => (
          <div key={index}>
            <Skeleton height={24} width={'100%'} margin="12px 0" />
            <Skeleton height={24} width={'100%'} margin="12px 0" />
            <Skeleton height={24} width={'100%'} margin="12px 0" />
            <Skeleton height={24} width={'95%'} margin="12px 0" />
            <Skeleton height={0} width={'100%'} margin="24px 0" />
          </div>
        ))}
    </div>
  );
});
