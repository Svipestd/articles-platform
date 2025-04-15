import { InputHTMLAttributes, memo, useCallback, useRef } from 'react';
import cls from './Input.module.scss';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text, TextColor } from '../Text/Text';
import { Button, ButtonVariant } from '../Button/Button';
import { Icon, IconSize } from '../Icon/Icon';
import { FaRegCircleXmark } from 'react-icons/fa6';

export enum InputSize {
  M = 'size-m',
  L = 'size-l',
}

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'readOnly' | 'onChange' | 'size'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  children?: React.ReactNode;
  size?: InputSize;
  label?: string;
  error?: string | null;
  disabled?: boolean;
  readonly?: boolean;
  isResetable?: boolean;
  value: string | number | null;
  onChange: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
  const {
    className = '',
    children,
    type = 'text',
    value,
    size = InputSize.M,
    label = '',
    error = null,
    disabled = false,
    readonly = false,
    isResetable = false,
    onChange,
    ...otherProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const mods: Mods = {
    [cls[size]]: true,
    [cls['error']]: Boolean(error),
    [cls.disabled]: disabled,
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    onChange(e.target.value);
  };

  const onClickInputContainer = useCallback(() => {
    if (!inputRef.current) return;

    inputRef.current.focus();
  }, []);

  const onClearInput = useCallback(() => {
    onChange('');
  }, [onChange]);

  const renderClearButton = () => {
    if (!isResetable && !value) return null;

    return (
      <>
        <div className={cls['input-reset-btn']}>
          <Button variant={ButtonVariant.TEXT} onClick={onClearInput}>
            <Icon Svg={FaRegCircleXmark} size={IconSize.S} />
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className={classNames(cls.Input, mods, [className])}>
      {label && <Text text={label}></Text>}

      <div className={classNames(cls['input-container'])} onClick={onClickInputContainer}>
        <input
          data-testid="input"
          ref={inputRef}
          type={type}
          value={value || ''}
          readOnly={readonly}
          disabled={disabled}
          onChange={onChangeHandler}
          {...otherProps}
        >
          {children}
        </input>

        {renderClearButton()}
      </div>

      {error && <Text className={cls['input-error']} text={error} color={TextColor.ERROR}></Text>}
    </div>
  );
});
