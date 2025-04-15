import { ButtonHTMLAttributes, FC, memo } from 'react';
import cls from './Button.module.scss';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

export enum ButtonVariant {
  SOLID = 'solid',
  TEXT = 'text',
  OUTLINE = 'outline',
}

export enum ButtonColor {
  PRIMARY = 'primary',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  square?: boolean;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = memo((props) => {
  const {
    className = '',
    children,
    variant = ButtonVariant.SOLID,
    color = ButtonColor.PRIMARY,
    square = false,
    size = ButtonSize.M,
    disabled = false,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls[variant]]: true,
    [cls[color]]: true,
    [cls[size]]: true,
    [cls.square]: square,
    [cls.disabled]: disabled,
  };

  return (
    <button
      data-testid="button"
      type="button"
      className={classNames(cls.Button, mods, [className])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
