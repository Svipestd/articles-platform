import { CSSProperties, FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';
import { useTranslation } from 'react-i18next';

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
  height: string | number;
  width: string | number;
  borderRadius?: string;
  margin?: string;
}

export const Skeleton: FC<SkeletonProps> = memo((props) => {
  const { className = '', height, width, borderRadius, margin } = props;
  const { t } = useTranslation();

  const styles: CSSProperties = {
    width,
    height,
    borderRadius,
    margin,
  };

  return <div className={classNames(cls.Skeleton, {}, [className])} style={styles}></div>;
});
