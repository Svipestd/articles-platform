import { FC, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PaginationLimit.module.scss';
import { useTranslation } from 'react-i18next';
import { Select, SelectOption, SelectSelectedOptions } from '@/shared/ui/Select/Select';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  DataListManagerModules,
  PAGINATION_LIMIT_DEFAULT,
  QueryOptions,
  SortOptionsValue,
} from '../../model/types/dataListManagerTypes';
import {
  dataListManagerActions,
  dataListManagerSelectors,
} from '../../model/slices/dataListManagerSlice/dataListManagerSlice';
import { useSelector } from 'react-redux';

const limitOptions: SelectOption[] = [
  { name: '10', value: '10' },
  { name: '20', value: '20' },
];

interface PaginationLimitProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  moduleName: DataListManagerModules;
  onOptionsChange?: (queryOptions: QueryOptions) => void;
}

export const PaginationLimit: FC<PaginationLimitProps> = memo((props) => {
  const { className = '', moduleName, disabled = false, onOptionsChange } = props;
  const dispatch = useAppDispatch();

  const paginationOptions = useSelector(
    dataListManagerSelectors.selectPaginationOptionsByModuleName(moduleName)
  );
  const queryOptions = useSelector(
    dataListManagerSelectors.selectQueryOptionsByModuleName(moduleName)
  );

  const paginationOptionsName = useMemo<string>(() => {
    return String(paginationOptions.limit || PAGINATION_LIMIT_DEFAULT);
  }, [paginationOptions]);

  const onLimitChange = (option: SelectSelectedOptions) => {
    const limitOption = option as string;
    const newPaginationOptions = { ...paginationOptions, limit: Number(limitOption) };

    dispatch(
      dataListManagerActions.setPaginationOptions({
        moduleName,
        paginationOptions: newPaginationOptions,
      })
    );

    if (onOptionsChange)
      onOptionsChange({
        ...queryOptions,
        paginationOptions: newPaginationOptions,
      });
  };

  return (
    <div className={classNames(cls.PaginationLimit, {}, [className])}>
      <Select
        className={className}
        disabled={disabled}
        options={limitOptions}
        value={paginationOptionsName}
        onChange={(option) => onLimitChange(option)}
      />
    </div>
  );
});
