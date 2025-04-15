import { CSSProperties, FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SkeletonCard.module.scss';
import { Skeleton } from '../Skeleton/Skeleton';
import { Card } from '../Card/Card';

export enum SkeletonCardType {
  USER = 'user',
  POST = 'post',
}

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
  cardType?: SkeletonCardType;
  margin?: string;
  width?: string;
}

export const SkeletonCard: FC<SkeletonProps> = memo((props) => {
  const { className = '', cardType = SkeletonCardType.USER, width = '100%', margin = '' } = props;

  const rednerImageSkeleton = () => {
    return (
      <div className={classNames(cls['image-container'])}>
        <Skeleton height={200} width={'100%'} />
      </div>
    );
  };

  const rednerUserAvatarSkeleton = () => {
    return (
      <div className={classNames(cls['user-avatar-container'])}>
        <div className={cls['avatar-container']}>
          <Skeleton height={75} width={75} borderRadius="50%" />
        </div>

        <div className={cls['data-container']}>
          <div className={cls['username']}>
            <Skeleton height={24} width={200} margin="6px 0" />
          </div>
          <div className={cls['email']}>
            <Skeleton height={24} width={100} margin="6px 0" />
          </div>
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    if (cardType === SkeletonCardType.POST) {
      return rednerImageSkeleton();
    }
    if (cardType === SkeletonCardType.USER) {
      return rednerUserAvatarSkeleton();
    }
  };

  const styles: CSSProperties = {
    margin: margin,
    width: width,
  };

  return (
    <div className={classNames(cls.SkeletonSection, {}, [className])} style={styles}>
      <Card>
        {renderHeader()}

        <Skeleton height={24} width={'100%'} margin="6px 0" />
        <Skeleton height={24} width={'95%'} margin="6px 0" />
      </Card>
    </div>
  );
});
