import { makeApiResponseFailure } from '@/shared/api/helpers/makeApiResponseFailure/makeApiResponseFailure';
import { makeApiResponseSuccess } from '@/shared/api/helpers/makeApiResponseSuccess/makeApiResponseSuccess';
import { $api } from '@/shared/api/api';
import { ApiResponse } from '@/shared/api/types';
import { Article } from '@/entities/Article';
import {
  PAGINATION_LIMIT_DEFAULT,
  PAGINATION_PAGE_DEFAULT,
  QueryOptions,
} from '@/features/DataListManager/model/types/dataListManagerTypes';
import { AxiosRequestConfig } from 'axios';

export enum ArticleAPIGetArticlesListErrors {
  ARTICLE_LIST_NOT_FOUND = '00040001',
}

export type ArticleAPIGetArticlesListRequestData = QueryOptions;

export type ArticleAPIGetArticlesListResponseData = {
  items: Article[];
  isLast: boolean;
};

export const getArticlesList = async (
  data?: ArticleAPIGetArticlesListRequestData,
  options?: AxiosRequestConfig
): Promise<ApiResponse<ArticleAPIGetArticlesListResponseData>> => {
  try {
    let params: Record<string, any> = {
      _expand: 'user',
    };

    if (data) {
      const sortOptions = Object.values(data.sortOptionsMap);

      const filterOptions = Object.values(data.filterOptionsMap);
      const filterOptionsForParams: Record<string, string | number> = {};
      for (const filterOption of filterOptions) {
        filterOptionsForParams[filterOption.name] = filterOption.value;
      }

      const paginationOptions = data.paginationOptions;

      params = {
        ...params,
        _sort: sortOptions[0]?.name || null,
        _page: paginationOptions.page || PAGINATION_PAGE_DEFAULT,
        _limit: paginationOptions.limit || PAGINATION_LIMIT_DEFAULT,
        _q: data.search || null,
        ...filterOptionsForParams,
      };
    }

    const response = await $api.get<ArticleAPIGetArticlesListResponseData>(`/articles`, {
      ...options,
      params,
    });

    return makeApiResponseSuccess(response);
  } catch (error) {
    return makeApiResponseFailure(error);
  }
};
