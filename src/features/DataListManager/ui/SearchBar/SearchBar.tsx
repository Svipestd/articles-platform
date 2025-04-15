import { FC, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SearchBar.module.scss';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/Input/Input';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DataListManagerModules, QueryOptions } from '../../model/types/dataListManagerTypes';
import {
  dataListManagerActions,
  dataListManagerSelectors,
} from '../../model/slices/dataListManagerSlice/dataListManagerSlice';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';

interface SearchBarProps {
  className?: string;
  children?: React.ReactNode;
  moduleName: DataListManagerModules;
  onOptionsChange?: (queryOptions: QueryOptions) => void;
}

export const SearchBar: FC<SearchBarProps> = memo((props) => {
  const { className = '', moduleName, onOptionsChange = () => {} } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const search = useSelector(dataListManagerSelectors.selectSearchByModuleName(moduleName));
  const queryOptions = useSelector(
    dataListManagerSelectors.selectQueryOptionsByModuleName(moduleName)
  );

  const onOptionsChangeDebounced = useDebounce(
    (queryOptions) => onOptionsChange(queryOptions),
    300,
    [queryOptions, search]
  );

  const onSearchChange = useCallback(
    (search: string) => {
      dispatch(dataListManagerActions.setSearch({ moduleName, search }));

      onOptionsChangeDebounced({ ...queryOptions, search });
    },
    [dispatch, moduleName, queryOptions, onOptionsChangeDebounced]
  );

  return (
    <div className={classNames(cls.SearchBar, {}, [className])}>
      <Input
        value={search}
        placeholder={t('GENERAL.PLACEHOLDERS.search')}
        isResetable={true}
        onChange={onSearchChange}
      />
    </div>
  );
});
