import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectOption, SelectSelectedOptions } from '@/shared/ui/Select/Select';
import { Country } from '../../model/types/countryTypes';

interface CountrySelectProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  value: Country | null;
  onChange: (value: Country) => void;
}

const options = [
  { value: Country.England, name: Country.England },
  { value: Country.USA, name: Country.USA },
  { value: Country.Germany, name: Country.Germany },
  { value: Country.Russia, name: Country.Russia },
];

export const CountrySelect: FC<CountrySelectProps> = memo((props) => {
  const { className = '', disabled = false, value = null, onChange } = props;
  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (option: SelectSelectedOptions) => {
      onChange(option as Country);
    },
    [onChange]
  );

  return (
    <Select
      className={className}
      label={t('GENERAL.FIELDS.country')}
      disabled={disabled}
      options={options}
      value={value}
      onChange={(option) => onChangeHandler(option)}
    />
  );
});
