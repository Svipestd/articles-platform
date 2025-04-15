import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleSectionSchema } from '../../types/articleSectionTypes';
import { fetchArticleThunk } from '../../services/fetchArticleThunk/fetchArticleThunk';
import { Article } from '@/entities/Article';
import { selectIsLoading } from '../../selectors/selectIsLoading/selectIsLoading';
import { selectError } from '../../selectors/selectError/selectError';
import { selectArticle } from '../../selectors/selectArticle/selectArticle';

const initialState: ArticleSectionSchema = {
  isLoading: false,
  error: null,
  article: null,
};

export const articleSectionSlice = createSlice({
  name: 'articleSection',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setArticle: (state, action: PayloadAction<Article | null>) => {
      state.article = action.payload;
    },
  },
});

export const { actions: articleSectionActions } = articleSectionSlice;
export const { reducer: articleSectionReducer } = articleSectionSlice;
export const articleSectionThunks = { fetchArticleThunk };
export const articleSectionSelectors = { selectIsLoading, selectError, selectArticle };
