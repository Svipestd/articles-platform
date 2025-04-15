import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ApiResponseFailure, ApiResponseStatus } from '@/shared/api/types';
import { profileSectionActions } from '@/widgets/Profile/ProfileSection/model/slices/profileSectionSlice/profileSectionSlice';
import { FormMode } from '@/shared/types/common';
import { commentCreateActions } from '../../slices/commentCreateSlice/commentCreateSlice';
import { CommentAPI } from '@/shared/api/comment/comment';
import { CommentAPICreateCommentRequestData } from '@/shared/api/comment/createComment/createComment';
import { Comment } from '@/entities/Comment';
import { commentSectionActions } from '@/widgets/Comment/CommentSection';

interface CommentCreateData {
  id: string;
  comment: CommentAPICreateCommentRequestData;
}

export const createCommentThunk = createAsyncThunk<void, CommentCreateData, ThunkConfig<string>>(
  'commentCreate/commentCreateThunk',
  async (data, thunkAPI) => {
    thunkAPI.dispatch(commentCreateActions.setIsLoading(true));

    try {
      const response = await CommentAPI.createComment(data.id, data.comment);

      if (response.status === ApiResponseStatus.SUCCESS) {
        const comment = response.data as Comment;

        thunkAPI.dispatch(commentSectionActions.setOneComment(comment));
      } else {
        const error = response as ApiResponseFailure;

        thunkAPI.dispatch(commentCreateActions.setError(error.data.error));
      }

      thunkAPI.dispatch(commentCreateActions.setIsLoading(false));
    } catch (error: unknown) {
      console.error(error);

      thunkAPI.dispatch(commentCreateActions.setIsLoading(false));
    }
  }
);
