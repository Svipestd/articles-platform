import { FC, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SortBar.module.scss';
import { useTranslation } from 'react-i18next';
import { Select, SelectOption, SelectSelectedOptions } from '@/shared/ui/Select/Select';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  DataListManagerModules,
  QueryOptions,
  SortOptionsValue,
} from '../../model/types/dataListManagerTypes';
import {
  dataListManagerActions,
  dataListManagerSelectors,
} from '../../model/slices/dataListManagerSlice/dataListManagerSlice';
import { useSelector } from 'react-redux';

interface SortBarProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  moduleName: DataListManagerModules;
  options: SelectOption[];
  onOptionsChange?: (queryOptions: QueryOptions) => void;
}

export const SortBar: FC<SortBarProps> = memo((props) => {
  const { className = '', moduleName, options, disabled = false, onOptionsChange } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const sortOptionsMap = useSelector(
    dataListManagerSelectors.selectSortOptionsMapByModuleName(moduleName)
  );
  const queryOptions = useSelector(
    dataListManagerSelectors.selectQueryOptionsByModuleName(moduleName)
  );

  const sortOptionsName = useMemo<string | null>(() => {
    const sortOptionsList = Object.values(sortOptionsMap);

    return sortOptionsList[0]?.name || null;
  }, [sortOptionsMap]);

  const onSortChange = (option: SelectSelectedOptions) => {
    const sortOption = option as string;
    const newSortOptionsMap = { [sortOption]: { name: sortOption, value: SortOptionsValue.DESC } };

    dispatch(
      dataListManagerActions.setSortOptionsMap({
        moduleName,
        sortOptionsMap: newSortOptionsMap,
      })
    );

    if (onOptionsChange) onOptionsChange({ ...queryOptions, sortOptionsMap: newSortOptionsMap });
  };

  return (
    <div className={classNames(cls.SortBar, {}, [className])}>
      <Select
        className={className}
        placeholder={t('GENERAL.PLACEHOLDERS.sort')}
        disabled={disabled}
        options={options}
        value={sortOptionsName}
        onChange={(option) => onSortChange(option)}
      />
    </div>
  );
});
