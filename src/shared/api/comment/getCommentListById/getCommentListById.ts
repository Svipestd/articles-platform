import { makeApiResponseFailure } from '@/shared/api/helpers/makeApiResponseFailure/makeApiResponseFailure';
import { makeApiResponseSuccess } from '@/shared/api/helpers/makeApiResponseSuccess/makeApiResponseSuccess';
import { $api } from '@/shared/api/api';
import { ApiResponse } from '@/shared/api/types';
import { Comment } from '@/entities/Comment';

export enum CommentAPIGetCommentListByIdErrors {
  COMMENT_LIST_NOT_FOUND = '00050001',
}

export const getCommentListById = async (id: string): Promise<ApiResponse<Comment[]>> => {
  try {
    const response = await $api.get<Comment[]>(`/comments`, {
      params: { articleId: id, _expand: 'user' },
    });

    return makeApiResponseSuccess(response);
  } catch (error) {
    return makeApiResponseFailure(error);
  }
};
