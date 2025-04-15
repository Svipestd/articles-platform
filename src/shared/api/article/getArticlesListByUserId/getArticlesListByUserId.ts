import { makeApiResponseFailure } from '@/shared/api/helpers/makeApiResponseFailure/makeApiResponseFailure';
import { makeApiResponseSuccess } from '@/shared/api/helpers/makeApiResponseSuccess/makeApiResponseSuccess';
import { $api } from '@/shared/api/api';
import { ApiResponse } from '@/shared/api/types';
import { Article } from '@/entities/Article';

export enum ArticleAPIGetArticlesListErrors {
  ARTICLE_LIST_NOT_FOUND = '00040001',
}

export type ArticleAPIGetArticlesListByUserIdResponseData = {
  items: Article[];
  isLast: boolean;
};

export const getArticlesListByUserId = async (
  id: string
): Promise<ApiResponse<ArticleAPIGetArticlesListByUserIdResponseData>> => {
  try {
    const response = await $api.get<ArticleAPIGetArticlesListByUserIdResponseData>(`/articles`, {
      params: { user: id },
    });

    return makeApiResponseSuccess(response);
  } catch (error) {
    return makeApiResponseFailure(error);
  }
};
