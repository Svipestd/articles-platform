import { CSSProperties, FC, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  FADED = 'faded',
  ERROR = 'error',
  WHITE = 'white',
}

export enum TextAlign {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export enum TextSize {
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
  XL = 'size-xl',
  XXL = 'size-xxl',
}

type TextTagType = 'h1' | 'h2' | 'h3' | 'p';

const mapSizeToTextTag: Record<TextSize, TextTagType> = {
  [TextSize.S]: 'p',
  [TextSize.M]: 'p',
  [TextSize.L]: 'p',
  [TextSize.XL]: 'h2',
  [TextSize.XXL]: 'h1',
};

interface TextProps {
  className?: string;
  children?: React.ReactNode;
  text: string | null;
  color?: TextColor;
  align?: TextAlign;
  size?: TextSize;
  margin?: string;
  width?: string;
  bold?: boolean;
  ellipsis?: boolean;
  showPopup?: boolean;
}

export const Text: FC<TextProps> = memo((props) => {
  const {
    className = '',
    text = '',
    color = TextColor.SECONDARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
    margin = '',
    width = '',
    bold = false,
    ellipsis = false,
    showPopup = false,
  } = props;

  const mods: Mods = {
    [cls[color]]: true,
    [cls[align]]: true,
    [cls[size]]: true,
    [cls.bold]: bold,
    [cls.ellipsis]: ellipsis,
  };

  const styles: CSSProperties = {
    margin: margin,
    width: width,
  };

  const TextTag = mapSizeToTextTag[size];

  return (
    <div className={classNames(cls.Text, mods, [className])} style={styles}>
      {text && (
        <TextTag className={cls.text} title={showPopup ? text : ''}>
          {text}
        </TextTag>
      )}
    </div>
  );
});
