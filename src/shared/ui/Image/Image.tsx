import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Image.module.scss';

interface ImageProps {
  className?: string;
  children?: React.ReactNode;
  alt?: string;
  src: string;
}

export const Image: FC<ImageProps> = memo((props) => {
  const { className = '', src, alt = '' } = props;

  return (
    <div className={classNames(cls.Image, {}, [className])}>
      <img src={src} alt={alt} />
    </div>
  );
});
