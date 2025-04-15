import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentCreateSchema } from '../../types/commentCreateTypes';
import { selectIsLoading } from '../../selectors/selectIsLoading/selectIsLoading';
import { selectError } from '../../selectors/selectError/selectError';
import { createCommentThunk } from '../../services/createCommentThunk/createCommentThunk';

const initialState: CommentCreateSchema = {
  isLoading: false,
  error: null,
};

export const commentCreateSlice = createSlice({
  name: 'commentCreate',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { actions: commentCreateActions } = commentCreateSlice;
export const { reducer: commentCreateReducer } = commentCreateSlice;
export const commentCreateThunks = { createCommentThunk };
export const commentCreateSelectors = { selectIsLoading, selectError };
