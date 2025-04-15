import { AppDispatch, AppStore, RootState } from '@/app/providers/StoreProvider';
import { articlesListAllSectionThunks } from '../../slices/articlesListAllSectionSlice/articlesListAllSectionSlice';
import {
  DataListManagerModules,
  QueryOptions,
} from '@/features/DataListManager/model/types/dataListManagerTypes';
import { dataListManagerHelpers } from '@/features/DataListManager/model/slices/dataListManagerSlice/dataListManagerSlice';
import { UrlHelpers } from '@/shared/lib/url';

interface InitData {
  queryOptions: QueryOptions;
}

export const initThunk = (data: InitData) => (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();
  const MODULE_NAME = DataListManagerModules.ARTICLES_ALL;
  const queryOptions = data.queryOptions || {};

  UrlHelpers.pushQueryParams(dataListManagerHelpers.convertQueryOptionsToQueryParams(queryOptions));

  if (!state.dataListManager.dataListOptionsMap[MODULE_NAME].generalOptions.isInited)
    dispatch(
      articlesListAllSectionThunks.fetchArticlesListAllThunk({
        queryOptions,
      })
    );
};
