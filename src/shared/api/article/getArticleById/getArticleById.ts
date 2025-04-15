import { makeApiResponseFailure } from '@/shared/api/helpers/makeApiResponseFailure/makeApiResponseFailure';
import { makeApiResponseSuccess } from '@/shared/api/helpers/makeApiResponseSuccess/makeApiResponseSuccess';
import { $api } from '@/shared/api/api';
import { ApiResponse } from '@/shared/api/types';
import { Article } from '@/entities/Article';

export enum ArticleAPIGetArticleByIdErrors {
  ARTICLE_LIST_NOT_FOUND = '00040001',
}

export const getArticleById = async (id: string): Promise<ApiResponse<Article>> => {
  try {
    const response = await $api.get<Article>(`/articles/${id}`, { params: { _expand: 'user' } });

    return makeApiResponseSuccess(response);
  } catch (error) {
    return makeApiResponseFailure(error);
  }
};
