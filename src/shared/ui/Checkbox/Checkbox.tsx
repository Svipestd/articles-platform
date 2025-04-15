import { FC, memo, useRef, useState } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Checkbox.module.scss';
import { useTranslation } from 'react-i18next';

export enum CheckboxSize {
  M = 'size-m',
  L = 'size-l',
}

interface SelectProps {
  className?: string;
  children?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  size?: CheckboxSize;
  error?: string | null;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const Checkbox: FC<SelectProps> = memo((props) => {
  const {
    className = '',
    label = '',
    disabled = false,
    error = null,
    size = CheckboxSize.M,
    value,
    onChange,
  } = props;

  const mods: Mods = {
    [cls[size]]: true,
    [cls['error']]: Boolean(error),
    [cls.disabled]: disabled,
  };

  const onChangeCheckbox = (checked: boolean) => {
    onChange(checked);
  };

  const renderCheckboxField = () => {
    return (
      <div className={cls['checkbox-container']}>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChangeCheckbox(e.target.checked)}
        />
      </div>
    );
  };

  return (
    <div className={classNames(cls.Checkbox, mods, [className])}>
      {renderCheckboxField()}

      {label && <span>{label}</span>}
    </div>
  );
});
