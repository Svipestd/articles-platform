import { makeApiResponseFailure } from '@/shared/api/helpers/makeApiResponseFailure/makeApiResponseFailure';
import { makeApiResponseSuccess } from '@/shared/api/helpers/makeApiResponseSuccess/makeApiResponseSuccess';
import { $api } from '@/shared/api/api';
import { ApiResponse } from '@/shared/api/types';
import { Comment } from '@/entities/Comment';
import { AxiosResponse } from 'axios';
import { LOCAL_STORAGE_CURRENT_USER_KEY } from '@/shared/const/localStorage';

export enum CommentAPICreateCommentErrors {
  COMMENT_LIST_NOT_FOUND = '00050001',
}

export interface CommentAPICreateCommentRequestData {
  text: string;
}

export const createComment = async (
  id: string,
  data: CommentAPICreateCommentRequestData
): Promise<ApiResponse<Comment>> => {
  try {
    const response = await $api.post<CommentAPICreateCommentRequestData, AxiosResponse<Comment>>(
      `/comments`,
      {
        ...data,
        articleId: id,
        userId: '1',
      }
    );

    return makeApiResponseSuccess(response);
  } catch (error) {
    return makeApiResponseFailure(error);
  }
};
