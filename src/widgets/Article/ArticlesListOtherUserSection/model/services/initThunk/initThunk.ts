import { AppDispatch, RootState } from '@/app/providers/StoreProvider';
import { QueryOptions } from '@/features/DataListManager/model/types/dataListManagerTypes';
import { dataListManagerHelpers } from '@/features/DataListManager/model/slices/dataListManagerSlice/dataListManagerSlice';
import { UrlHelpers } from '@/shared/lib/url';
import { articlesListOtherUserSectionThunks } from '../../slices/articlesListOtherUserSectionSlice/articlesListOtherUserSectionSlice';

interface InitData {
  queryOptions: QueryOptions;
}

export const initThunk = (data: InitData) => (dispatch: AppDispatch, getState: () => RootState) => {
  const queryOptions = data.queryOptions || {};

  UrlHelpers.pushQueryParams(dataListManagerHelpers.convertQueryOptionsToQueryParams(queryOptions));

  dispatch(
    articlesListOtherUserSectionThunks.fetchArticlesListOtherUserThunk({
      queryOptions,
    })
  );
};
