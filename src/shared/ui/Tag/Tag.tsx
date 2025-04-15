import { FC, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Tag.module.scss';
import { Text, TextColor, TextSize } from '../Text/Text';

export enum TagColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  FADED = 'faded',
  ERROR = 'error',
}

export enum TagAlign {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export enum TagSize {
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
  XL = 'size-xl',
  XXL = 'size-xxl',
}

interface TagProps {
  className?: string;
  children?: React.ReactNode;
  text: string | null;
  color?: TagColor;
  size?: TagSize;
  bold?: boolean;
  showPopup?: boolean;
}

export const Tag: FC<TagProps> = memo((props) => {
  const {
    className = '',
    text = '',
    color = TagColor.PRIMARY,
    size = TagSize.M,
    bold = false,
  } = props;

  const mods: Mods = {
    [cls[color]]: true,
  };

  const textSize = size as unknown as TextSize;

  return (
    <div className={classNames(cls.Tag, mods, [className])}>
      <Text text={text} size={textSize} bold color={TextColor.WHITE} />
    </div>
  );
});
