import { FC, memo, useCallback, useEffect, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesListAllSection.module.scss';
import { useTranslation } from 'react-i18next';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  articlesListAllSectionReducer,
  articlesListAllSectionSelectors,
  articlesListAllSectionThunks,
} from '../../model/slices/articlesListAllSectionSlice/articlesListAllSectionSlice';
import { ArticlesList } from '@/features/Article/ArticlesList';
import {
  DataListManagerModules,
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
import { ObjectHelpers } from '@/shared/lib/object';
import { useSearchParams } from 'react-router-dom';
import { VStack } from '@/shared/ui/Stack';

const initialReducers: ReducersList = {
  articlesListAllSection: articlesListAllSectionReducer,
};

const MODULE_NAME = DataListManagerModules.ARTICLES_ALL;

interface ArticlesListAllSectionProps {
  className?: string;
  children?: React.ReactNode;
}

export const ArticlesListAllSection: FC<ArticlesListAllSectionProps> = memo((props) => {
  const { className = '' } = props;
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const articlesListSectionIsLoading = useSelector(articlesListAllSectionSelectors.selectIsLoading);
  const articlesListSectionError = useSelector(articlesListAllSectionSelectors.selectError);
  const articlesListSectionArticlesListAll = useSelector(
    articlesListAllSectionSelectors.selectArticlesListAll
  );

  const appIsPageEnd = useSelector(appSelectors.selectIsPageEnd);

  const queryOptions = useSelector(
    dataListManagerSelectors.selectQueryOptionsByModuleName(MODULE_NAME)
  );
  const viewOptions = useSelector(
    dataListManagerSelectors.selectViewOptionsByModuleName(MODULE_NAME)
  );
  const generalOptions = useSelector(
    dataListManagerSelectors.selectGeneralOptionsByModuleName(MODULE_NAME)
  );

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
        articlesListAllSectionThunks.fetchArticlesListAllThunk({
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
    const newQueryOptions: QueryOptions = {
      ...queryOptions,
      ...dataListManagerHelpers.convertQueryParamsToQueryOptions(searchParams),
    };

    dispatch(articlesListAllSectionThunks.initThunk({ queryOptions: newQueryOptions }));
  }, []);

  // Update items list, when reach page end
  useEffect(() => {
    if (appIsPageEnd && !queryOptions.paginationOptions.isLast && !articlesListSectionIsLoading) {
      updateItemsList(
        ObjectHelpers.editObject(queryOptions, {
          ['paginationOptions.page']: queryOptions.paginationOptions.page + 1,
        }),
        ResponseListSetType.UPDATE
      );
    }
  }, [appIsPageEnd, queryOptions, articlesListSectionIsLoading, updateItemsList]);

  const renderArticlesList = () => {
    return (
      <ArticlesList
        articlesList={articlesListSectionArticlesListAll}
        isLoading={articlesListSectionIsLoading}
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
      <div className={classNames(cls.ArticlesListAllSection, {}, [className])}>
        {renderContent()}
      </div>
    </DynamicModuleLoader>
  );
});
