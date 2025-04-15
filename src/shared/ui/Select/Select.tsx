import { FC, memo, useEffect, useRef, useState } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';
import { Icon, IconSize } from '../Icon/Icon';
import { FaAngleDown, FaRegCircleXmark, FaXmark } from 'react-icons/fa6';
import { Button, ButtonVariant } from '../Button/Button';
import { Text, TextColor, TextSize } from '../Text/Text';
import { Checkbox } from '../Checkbox/Checkbox';

export enum SelectSize {
  M = 'size-m',
  L = 'size-l',
}

export interface SelectOption {
  name: string;
  value: string;
  [key: string]: any;
}

export type SelectSelectedOptions = Record<string, SelectOption> | string | string[] | null;

interface SelectProps {
  className?: string;
  children?: React.ReactNode;
  label?: string;
  searchable?: boolean;
  multiple?: boolean;
  resetable?: boolean;
  returnObject?: boolean;
  disabled?: boolean;
  size?: SelectSize;
  error?: string | null;
  placeholder?: string;
  options: SelectOption[];
  value: Record<string, SelectOption> | string | string[] | null;
  onChange: (selectedOptions: SelectSelectedOptions) => void;
}

export const Select: FC<SelectProps> = memo((props) => {
  const {
    className = '',
    label = '',
    searchable = false,
    multiple = false,
    resetable = false,
    returnObject = false,
    disabled = false,
    error = null,
    size = SelectSize.M,
    placeholder = '',
    options,
    value,
    onChange,
  } = props;

  const [selectedOptions, setSelectedOptions] = useState<Record<string, SelectOption>>({});
  const [isSelectFocused, setIsSelectFocused] = useState<boolean>(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const mods: Mods = {
    [cls[size]]: true,
    [cls['error']]: Boolean(error),
    [cls.disabled]: disabled,
  };

  useEffect(() => {
    if (!value) return;

    // If value is string or string[]
    if (Array.isArray(value) || typeof value === 'string') {
      const newSelectedOptions: Record<string, SelectOption> = {};
      const valueArray = Array.isArray(value) ? value : [value];

      for (const item of valueArray) {
        const option = options.find((option) => option.value === item);
        if (!option) continue;

        newSelectedOptions[option.name] = option;
      }

      setSelectedOptions(newSelectedOptions);
    }

    // If value is Record<string, SelectOption>
    if (!Array.isArray(value) && typeof value === 'object') {
      const newSelectedOptions: Record<string, SelectOption> = { ...value };

      setSelectedOptions(newSelectedOptions);
    }
  }, [value, options]);

  useEffect(() => {
    const closeHandler = (e: MouseEvent) => {
      if (!selectRef.current?.contains(e.target as Node)) {
        setIsSelectFocused(false);
      }
    };

    document.addEventListener('click', closeHandler);

    return () => {
      document.removeEventListener('click', closeHandler);
    };
  });

  const onChangeSelect = (option: SelectOption) => {
    let newSelectedOptions = { ...selectedOptions };
    const isSelected = Boolean(selectedOptions[option.name]);

    if (multiple) {
      if (isSelected) delete newSelectedOptions[option.name];
      if (!isSelected) {
        newSelectedOptions[option.name] = option;
      }

      if (returnObject) onChange(newSelectedOptions);
      if (!returnObject) {
        onChange(Object.values(newSelectedOptions).map((option) => option.value));
      }
    }

    if (!multiple) {
      if (!isSelected) {
        newSelectedOptions = {};
        newSelectedOptions[option.name] = option;
      }

      if (returnObject) onChange(newSelectedOptions);
      if (!returnObject) {
        onChange(Object.values(newSelectedOptions)[0]?.value || null);
      }

      setIsSelectFocused(false);
    }

    setSelectedOptions(newSelectedOptions);
  };

  const renderSelectInput = () => {
    const selectedOptionsList = Object.values(selectedOptions);
    const selectedOption = selectedOptionsList[0];

    let inputValue = selectedOption?.name;
    if (multiple) inputValue = '';
    if (searchable) inputValue = '';

    return (
      <>
        <Text text={inputValue || placeholder} />

        {resetable && inputValue && (
          <>
            <div className={cls['select-reset-btn']}>
              <Button variant={ButtonVariant.TEXT} onClick={() => {}}>
                <Icon Svg={FaRegCircleXmark} size={IconSize.S} />
              </Button>
            </div>
          </>
        )}
      </>
    );
  };

  const renderSelectBadges = () => {
    return (
      <div className={cls['select-badges-container']}>
        {Object.values(selectedOptions).map((item) => (
          <div
            className={cls['select-badges-item']}
            key={item.value}
            onClick={() => onChangeSelect(item)}
          >
            <Text text={item.name} color={TextColor.SECONDARY} size={TextSize.M}></Text>
            <Icon Svg={FaXmark} size={IconSize.S} />
          </div>
        ))}
      </div>
    );
  };

  const renderSelectIcon = () => {
    return (
      <div>
        <Icon Svg={FaAngleDown} size={IconSize.S} />
      </div>
    );
  };

  const renderSelectField = () => {
    return (
      <div
        className={cls['select-field-container']}
        onClick={() => setIsSelectFocused(!isSelectFocused)}
      >
        {multiple && renderSelectBadges()}

        {renderSelectInput()}
        {renderSelectIcon()}

        {error && (
          <Text className={cls['select-error']} text={error} color={TextColor.ERROR}></Text>
        )}
      </div>
    );
  };

  const renderSelectList = () => {
    return (
      <div className={classNames(cls['select-list'], { [cls['show']]: isSelectFocused })}>
        {options.map((item) => (
          <div
            className={cls['select-list-item']}
            key={item.value}
            onClick={() => onChangeSelect(item)}
          >
            {multiple && (
              <Checkbox value={Boolean(selectedOptions[item.name])} onChange={() => {}} />
            )}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={classNames(cls.Select, mods, [className])} ref={selectRef}>
      {label && <span>{label}</span>}

      <div className={cls['select-container']}>
        {renderSelectField()}

        <div className={cls['select-list-container']}>{renderSelectList()}</div>
      </div>
    </div>
  );
});
