import { AppDispatch } from '@/app/providers/StoreProvider';
import { ApiResponseFailure, ApiResponseStatus } from '@/shared/api/types';
import { articlesListAllSectionActions } from '../../slices/articlesListAllSectionSlice/articlesListAllSectionSlice';
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
import { UrlHelpers } from '@/shared/lib/url';

interface ResponseOptions {
  responseListSetType?: ResponseListSetType;
}

interface FetchArticlesListAllData {
  queryOptions: QueryOptions;
  responseOptions?: ResponseOptions;
}

export const fetchArticlesListAllThunk =
  (data: FetchArticlesListAllData) => async (dispatch: AppDispatch) => {
    const moduleName = DataListManagerModules.ARTICLES_ALL;
    const queryOptions = data.queryOptions || {};
    const responseListSetType =
      data.responseOptions?.responseListSetType || ResponseListSetType.REPLACE;

    try {
      dispatch(articlesListAllSectionActions.setIsLoading(true));

      UrlHelpers.pushQueryParams(
        dataListManagerHelpers.convertQueryOptionsToQueryParams(queryOptions)
      );

      if (responseListSetType === ResponseListSetType.REPLACE) {
        dispatch(articlesListAllSectionActions.setAllArticles([]));
      }

      const response = await dispatch(
        httpThunks.addHttpTaskThunk({
          name: 'getArticlesListAll',
          requestHandler: ArticleAPI.getArticlesList,
          requestData: data.queryOptions,
        })
      );

      if (response.status === ApiResponseStatus.CANCELED) return;

      if (response.status === ApiResponseStatus.SUCCESS) {
        const { items, isLast } = response.data as ArticleAPIGetArticlesListResponseData;

        switch (responseListSetType) {
          case ResponseListSetType.REPLACE: {
            dispatch(articlesListAllSectionActions.setAllArticles(items));
            break;
          }
          case ResponseListSetType.APPEND: {
            dispatch(articlesListAllSectionActions.setManyArticle(items));
            break;
          }
          case ResponseListSetType.UPDATE: {
            dispatch(articlesListAllSectionActions.setManyArticle(items));
            break;
          }
          default: {
            dispatch(articlesListAllSectionActions.setAllArticles(items));
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

        dispatch(articlesListAllSectionActions.setError(error.data.error));
      }

      dispatch(articlesListAllSectionActions.setIsLoading(false));
    } catch (error: unknown) {
      console.error(error);

      dispatch(articlesListAllSectionActions.setIsLoading(false));
    }
  };
