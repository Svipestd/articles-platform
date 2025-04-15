import { FC, FunctionComponent, memo, SVGProps } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

export enum IconSize {
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
}

export enum IconColor {
  UNSET = 'unset',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SECONDARY_INVERTED = 'secondary-inverted',
  FADED = 'faded',
}

interface IconProps {
  className?: string;
  Svg: FunctionComponent<SVGProps<SVGSVGElement>>;
  size?: IconSize;
  color?: IconColor;
}

export const Icon: FC<IconProps> = memo((props) => {
  const { className = '', Svg, size = IconSize.M, color = IconColor.FADED } = props;

  const mods: Mods = {
    [cls[size]]: true,
    [cls[color]]: true,
  };

  return <Svg className={classNames(cls.Icon, mods, [className])}></Svg>;
});
