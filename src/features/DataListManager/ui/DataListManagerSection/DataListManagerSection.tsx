import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './DataListManagerSection.module.scss';
import { SortBar } from '../SortBar/SortBar';
import { DataListManagerModules, QueryOptions } from '../../model/types/dataListManagerTypes';
import { SelectOption } from '@/shared/ui/Select/Select';
import { DisplaySwitcher } from '../DisplaySwitcher/DisplaySwitcher';
import { SearchBar } from '../SearchBar/SearchBar';
import { Card } from '@/shared/ui/Card/Card';
import { PaginationLimit } from '../PaginationLimit/PaginationLimit';
import { HStack, VStack } from '@/shared/ui/Stack';

interface DataListManagerSectionProps {
  className?: string;
  children?: React.ReactNode;
  moduleName: DataListManagerModules;
  sortOptions: SelectOption[];
  onOptionsChange?: (queryOptions: QueryOptions) => void;
}

export const DataListManagerSection: FC<DataListManagerSectionProps> = memo((props) => {
  const { className = '', moduleName, sortOptions, onOptionsChange } = props;

  return (
    <div className={classNames(cls.DataListManagerSection, {}, [className])}>
      <Card>
        <VStack gap="12">
          <HStack align="center" justify="between" gap="12">
            <HStack gap="12">
              <SortBar
                moduleName={moduleName}
                options={sortOptions}
                onOptionsChange={onOptionsChange}
              />

              <PaginationLimit moduleName={moduleName} onOptionsChange={onOptionsChange} />
            </HStack>

            <DisplaySwitcher moduleName={moduleName} />
          </HStack>

          <SearchBar moduleName={moduleName} onOptionsChange={onOptionsChange} />
        </VStack>
      </Card>
    </div>
  );
});
