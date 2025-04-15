import { AppDispatch } from '@/app/providers/StoreProvider';
import { ApiResponseFailure, ApiResponseStatus } from '@/shared/api/types';
import { ArticleAPI } from '@/shared/api/article/article';
import {
  DataListManagerModules,
  QueryOptions,
} from '@/features/DataListManager/model/types/dataListManagerTypes';
import { ArticleAPIGetArticlesListResponseData } from '@/shared/api/article/getArticlesList/getArticlesList';
import {
  dataListManagerActions,
  dataListManagerHelpers,
} from '@/features/DataListManager/model/slices/dataListManagerSlice/dataListManagerSlice';
import { ResponseListSetType } from '@/shared/types/common';
import { httpThunks } from '@/app/model/http/slices/httpSlice/httpSlice';
import { articlesListCurrentUserSectionActions } from '../../slices/articlesListCurrentUserSectionSlice/articlesListCurrentUserSectionSlice';
import { UrlHelpers } from '@/shared/lib/url';

interface ResponseOptions {
  responseListSetType?: ResponseListSetType;
}

interface FetchArticlesListCurrentUserData {
  queryOptions: QueryOptions;
  responseOptions?: ResponseOptions;
}

export const fetchArticlesListCurrentUserThunk =
  (data: FetchArticlesListCurrentUserData) => async (dispatch: AppDispatch) => {
    const moduleName = DataListManagerModules.ARTICLES_CURRENT_USER;
    const queryOptions = data.queryOptions || {};
    const responseListSetType =
      data.responseOptions?.responseListSetType || ResponseListSetType.REPLACE;

    try {
      dispatch(articlesListCurrentUserSectionActions.setIsLoading(true));

      UrlHelpers.pushQueryParams(
        dataListManagerHelpers.convertQueryOptionsToQueryParams(queryOptions)
      );

      if (responseListSetType === ResponseListSetType.REPLACE) {
        dispatch(articlesListCurrentUserSectionActions.setAllArticles([]));
      }

      const response = await dispatch(
        httpThunks.addHttpTaskThunk({
          name: 'getArticlesListCurrentUser',
          requestHandler: ArticleAPI.getArticlesList,
          requestData: data.queryOptions,
        })
      );

      if (response.status === ApiResponseStatus.CANCELED) return;

      if (response.status === ApiResponseStatus.SUCCESS) {
        const { items, isLast } = response.data as ArticleAPIGetArticlesListResponseData;

        switch (responseListSetType) {
          case ResponseListSetType.REPLACE: {
            dispatch(articlesListCurrentUserSectionActions.setAllArticles(items));
            break;
          }
          case ResponseListSetType.APPEND: {
            dispatch(articlesListCurrentUserSectionActions.setManyArticle(items));
            break;
          }
          case ResponseListSetType.UPDATE: {
            dispatch(articlesListCurrentUserSectionActions.setManyArticle(items));
            break;
          }
          default: {
            dispatch(articlesListCurrentUserSectionActions.setAllArticles(items));
          }
        }

        dispatch(
          dataListManagerActions.setPaginationOptions({
            moduleName: moduleName,
            paginationOptions: { isLast },
          })
        );

        dispatch(
          dataListManagerActions.setIsInited({
            moduleName: moduleName,
            isInited: true,
          })
        );
      } else {
        const error = response as ApiResponseFailure;

        dispatch(articlesListCurrentUserSectionActions.setError(error.data.error));
      }

      dispatch(articlesListCurrentUserSectionActions.setIsLoading(false));
    } catch (error: unknown) {
      console.error(error);

      dispatch(articlesListCurrentUserSectionActions.setIsLoading(false));
    }
  };
