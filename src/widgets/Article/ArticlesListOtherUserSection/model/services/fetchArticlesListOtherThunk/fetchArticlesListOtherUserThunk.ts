import { AppDispatch } from '@/app/providers/StoreProvider';
import { ApiResponseFailure, ApiResponseStatus } from '@/shared/api/types';
import { ArticleAPI } from '@/shared/api/article/article';
import {
  DataListManagerModules,
  QueryOptions,
} from '@/features/DataListManager/model/types/dataListManagerTypes';
import {
  dataListManagerActions,
  dataListManagerHelpers,
} from '@/features/DataListManager/model/slices/dataListManagerSlice/dataListManagerSlice';
import { ResponseListSetType } from '@/shared/types/common';
import { httpThunks } from '@/app/model/http/slices/httpSlice/httpSlice';
import { articlesListOtherUserSectionActions } from '../../slices/articlesListOtherUserSectionSlice/articlesListOtherUserSectionSlice';
import { ArticleAPIGetArticlesListResponseData } from '@/shared/api/article/getArticlesList/getArticlesList';
import { UrlHelpers } from '@/shared/lib/url';

interface ResponseOptions {
  responseListSetType?: ResponseListSetType;
}

interface FetchArticlesListOtherUserData {
  queryOptions: QueryOptions;
  responseOptions?: ResponseOptions;
}

export const fetchArticlesListOtherUserThunk =
  (data: FetchArticlesListOtherUserData) => async (dispatch: AppDispatch) => {
    const moduleName = DataListManagerModules.ARTICLES_OTHER_USER;
    const queryOptions = data.queryOptions || {};
    const responseListSetType =
      data.responseOptions?.responseListSetType || ResponseListSetType.REPLACE;

    try {
      dispatch(articlesListOtherUserSectionActions.setIsLoading(true));

      UrlHelpers.pushQueryParams(
        dataListManagerHelpers.convertQueryOptionsToQueryParams(queryOptions)
      );

      if (responseListSetType === ResponseListSetType.REPLACE) {
        dispatch(articlesListOtherUserSectionActions.setAllArticles([]));
      }

      const response = await dispatch(
        httpThunks.addHttpTaskThunk({
          name: 'getArticlesListOtherUser',
          requestHandler: ArticleAPI.getArticlesList,
          requestData: data.queryOptions,
        })
      );

      if (response.status === ApiResponseStatus.CANCELED) return;

      if (response.status === ApiResponseStatus.SUCCESS) {
        const { items, isLast } = response.data as ArticleAPIGetArticlesListResponseData;

        switch (responseListSetType) {
          case ResponseListSetType.REPLACE: {
            dispatch(articlesListOtherUserSectionActions.setAllArticles(items));
            break;
          }
          case ResponseListSetType.APPEND: {
            dispatch(articlesListOtherUserSectionActions.setManyArticle(items));
            break;
          }
          case ResponseListSetType.UPDATE: {
            dispatch(articlesListOtherUserSectionActions.setManyArticle(items));
            break;
          }
          default: {
            dispatch(articlesListOtherUserSectionActions.setAllArticles(items));
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

        dispatch(articlesListOtherUserSectionActions.setError(error.data.error));
      }

      dispatch(articlesListOtherUserSectionActions.setIsLoading(false));
    } catch (error: unknown) {
      console.error(error);

      dispatch(articlesListOtherUserSectionActions.setIsLoading(false));
    }
  };
