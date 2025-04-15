import { FC, memo, useCallback, useEffect, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesListOtherUserSection.module.scss';
import { useTranslation } from 'react-i18next';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  articlesListOtherUserSectionReducer,
  articlesListOtherUserSectionSelectors,
  articlesListOtherUserSectionThunks,
} from '../../model/slices/articlesListOtherUserSectionSlice/articlesListOtherUserSectionSlice';
import { ArticlesList } from '@/features/Article/ArticlesList';
import {
  DataListManagerModules,
  FilterOptionsMap,
  QueryOptions,
} from '@/features/DataListManager/model/types/dataListManagerTypes';
import {
  dataListManagerActions,
  dataListManagerHelpers,
  dataListManagerSelectors,
} from '@/features/DataListManager/model/slices/dataListManagerSlice/dataListManagerSlice';
import { DataListManagerSection } from '@/features/DataListManager/ui/DataListManagerSection/DataListManagerSection';
import { appSelectors } from '@/app/model/app/slices/appSlice/appSlice';
import { ResponseListSetType } from '@/shared/types/common';
import { useSearchParams } from 'react-router-dom';
import { ObjectHelpers } from '@/shared/lib/object';
import { VStack } from '@/shared/ui/Stack';

const initialReducers: ReducersList = {
  articlesListOtherUserSection: articlesListOtherUserSectionReducer,
};

const MODULE_NAME = DataListManagerModules.ARTICLES_OTHER_USER;

interface ArticlesListOtherUserSectionProps {
  className?: string;
  children?: React.ReactNode;
  userId: string;
}

export const ArticlesListOtherUserSection: FC<ArticlesListOtherUserSectionProps> = memo((props) => {
  const { className = '', userId } = props;
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const articlesListOtherUserSectionIsLoading = useSelector(
    articlesListOtherUserSectionSelectors.selectIsLoading
  );
  const articlesListOtherUserSectionError = useSelector(
    articlesListOtherUserSectionSelectors.selectError
  );
  const articlesListOtherUserSectionArticlesListAll = useSelector(
    articlesListOtherUserSectionSelectors.selectArticlesListAll
  );

  const appIsPageEnd = useSelector(appSelectors.selectIsPageEnd);

  const queryOptions = useSelector(
    dataListManagerSelectors.selectQueryOptionsByModuleName(MODULE_NAME)
  );
  const viewOptions = useSelector(
    dataListManagerSelectors.selectViewOptionsByModuleName(MODULE_NAME)
  );
  // const generalOptions = useSelector(
  //   dataListManagerSelectors.selectGeneralOptionsByModuleName(MODULE_NAME)
  // );

  const sortOptions = useMemo(() => {
    return [
      { name: t('GENERAL.SORT.best', { ns: 'translation' }), value: 'views' },
      { name: t('GENERAL.SORT.new', { ns: 'translation' }), value: 'createdAt' },
    ];
  }, [t]);

  // Function, to update current items list
  // Used as callback in DataListManager components, when any changes are made
  const updateItemsList = useCallback(
    (queryOptions: QueryOptions, responseListSetType?: ResponseListSetType) => {
      dispatch(
        articlesListOtherUserSectionThunks.fetchArticlesListOtherUserThunk({
          queryOptions,
          responseOptions: { responseListSetType },
        })
      );
    },
    [dispatch]
  );

  // Initial useEffect
  // Set initial filterOptions and make first list request
  useEffect(() => {
    const initialFilterOptions: FilterOptionsMap = {
      userId: { name: 'userId', value: userId },
    };

    const newQueryOptions: QueryOptions = {
      ...queryOptions,
      ...dataListManagerHelpers.convertQueryParamsToQueryOptions(searchParams),
      filterOptionsMap: initialFilterOptions,
    };

    dispatch(articlesListOtherUserSectionThunks.initThunk({ queryOptions: newQueryOptions }));
  }, []);

  // Update items list, when reach page end
  useEffect(() => {
    if (
      appIsPageEnd &&
      !queryOptions.paginationOptions.isLast &&
      !articlesListOtherUserSectionIsLoading
    ) {
      updateItemsList(
        ObjectHelpers.editObject(queryOptions, {
          ['paginationOptions.page']: queryOptions.paginationOptions.page + 1,
        }),
        ResponseListSetType.UPDATE
      );
    }
  }, [appIsPageEnd, queryOptions, articlesListOtherUserSectionIsLoading, updateItemsList]);

  const renderArticlesList = () => {
    return (
      <ArticlesList
        articlesList={articlesListOtherUserSectionArticlesListAll}
        isLoading={articlesListOtherUserSectionIsLoading}
        displayType={viewOptions.displayType}
      />
    );
  };

  const renderContent = () => {
    return (
      <VStack gap="24">
        <DataListManagerSection
          moduleName={MODULE_NAME}
          sortOptions={sortOptions}
          onOptionsChange={updateItemsList}
        />

        {renderArticlesList()}
      </VStack>
    );
  };

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
      <div className={classNames(cls.ArticlesListOtherUserSection, {}, [className])}>
        {renderContent()}
      </div>
    </DynamicModuleLoader>
  );
});
