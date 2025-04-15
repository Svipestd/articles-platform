import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { selectIsLoading } from '../../selectors/selectIsLoading/selectIsLoading';
import { selectError } from '../../selectors/selectError/selectError';
import { CommentSectionSchema } from '../../types/commentSectionTypes';
import { Comment } from '@/entities/Comment';
import { fetchCommentListByIdThunk } from '../../services/fetchCommentListByIdThunk/fetchCommentListByIdThunk';
import { StateSchema } from '@/app/providers/StoreProvider';

export const commentSectionNormalizer = createEntityAdapter<Comment>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState: CommentSectionSchema = commentSectionNormalizer.getInitialState({
  isLoading: false,
  error: null,
});

export const commentSectionSlice = createSlice({
  name: 'commentSection',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAllComments: (state, action: PayloadAction<Comment[]>) => {
      commentSectionNormalizer.setAll(state, action.payload);
    },
    setOneComment: (state, action: PayloadAction<Comment>) => {
      commentSectionNormalizer.setOne(state, action.payload);
    },
  },
});

export const { actions: commentSectionActions } = commentSectionSlice;
export const { reducer: commentSectionReducer } = commentSectionSlice;
export const commentSectionThunks = { fetchCommentListByIdThunk };
const {
  selectAll: selectCommentsAll,
  selectIds: selectCommentsIds,
  selectById: selectCommentById,
} = commentSectionNormalizer.getSelectors<StateSchema>(
  (state) => state.commentSection || commentSectionNormalizer.getInitialState()
);
export const commentSectionSelectors = {
  selectIsLoading,
  selectError,
  selectCommentsAll,
  selectCommentsIds,
  selectCommentById,
};
