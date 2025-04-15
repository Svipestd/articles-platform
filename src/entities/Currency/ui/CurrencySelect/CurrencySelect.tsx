import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Currency } from '../../model/types/currency';
import { Select, SelectOption, SelectSelectedOptions } from '@/shared/ui/Select/Select';

interface CurrencySelectProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  value: Currency | null;
  onChange: (value: Currency) => void;
}

const options = [
  { value: Currency.RUB, name: Currency.RUB },
  { value: Currency.USD, name: Currency.USD },
  { value: Currency.EUR, name: Currency.EUR },
];

export const CurrencySelect: FC<CurrencySelectProps> = memo((props) => {
  const { className = '', disabled = false, value = null, onChange } = props;
  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (option: SelectSelectedOptions) => {
      onChange(option as Currency);
    },
    [onChange]
  );

  return (
    <Select
      className={className}
      label={t('GENERAL.FIELDS.currency')}
      disabled={disabled}
      options={options}
      value={value}
      onChange={(option) => onChangeHandler(option)}
    />
  );
});
