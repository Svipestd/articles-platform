import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ApiResponseFailure, ApiResponseStatus } from '@/shared/api/types';
import { CommentAPI } from '@/shared/api/comment/comment';
import { Comment } from '@/entities/Comment';
import { commentSectionActions } from '../../slices/commentSectionSlice/commentSectionSlice';

interface ViewCommentListData {
  id: string;
}

export const fetchCommentListByIdThunk = createAsyncThunk<
  void,
  ViewCommentListData,
  ThunkConfig<string>
>('commentSection/fetchCommentListByIdThunk', async (data, thunkAPI) => {
  thunkAPI.dispatch(commentSectionActions.setIsLoading(true));

  try {
    const response = await CommentAPI.getCommentListById(data.id);

    if (response.status === ApiResponseStatus.SUCCESS) {
      const commentList = response.data as Comment[];

      thunkAPI.dispatch(commentSectionActions.setAllComments(commentList));
    } else {
      const error = response as ApiResponseFailure;

      thunkAPI.dispatch(commentSectionActions.setError(error.data.error));
    }

    thunkAPI.dispatch(commentSectionActions.setIsLoading(false));
  } catch (error: unknown) {
    console.error(error);

    thunkAPI.dispatch(commentSectionActions.setIsLoading(false));
  }
});
