import { AppDispatch, RootState } from '@/app/providers/StoreProvider';
import {
  DataListManagerModules,
  QueryOptions,
} from '@/features/DataListManager/model/types/dataListManagerTypes';
import { dataListManagerHelpers } from '@/features/DataListManager/model/slices/dataListManagerSlice/dataListManagerSlice';
import { UrlHelpers } from '@/shared/lib/url';
import { articlesListCurrentUserSectionThunks } from '../../slices/articlesListCurrentUserSectionSlice/articlesListCurrentUserSectionSlice';

interface InitData {
  queryOptions: QueryOptions;
}

export const initThunk = (data: InitData) => (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();
  const MODULE_NAME = DataListManagerModules.ARTICLES_CURRENT_USER;
  const queryOptions = data.queryOptions || {};

  UrlHelpers.pushQueryParams(dataListManagerHelpers.convertQueryOptionsToQueryParams(queryOptions));

  if (!state.dataListManager.dataListOptionsMap[MODULE_NAME].generalOptions.isInited)
    dispatch(
      articlesListCurrentUserSectionThunks.fetchArticlesListCurrentUserThunk({
        queryOptions,
      })
    );
};
