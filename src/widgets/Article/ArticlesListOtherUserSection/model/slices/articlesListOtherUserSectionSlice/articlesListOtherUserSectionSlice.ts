import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { selectIsLoading } from '../../selectors/selectIsLoading/selectIsLoading';
import { selectError } from '../../selectors/selectError/selectError';
import { ArticlesListOtherUserSectionSchema } from '../../types/articlesListOtherUserSectionTypes';
import { Article } from '@/entities/Article';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchArticlesListOtherUserThunk } from '../../services/fetchArticlesListOtherThunk/fetchArticlesListOtherUserThunk';
import { initThunk } from '../../services/initThunk/initThunk';

export const articlesListOtherUserSectionNormalizer = createEntityAdapter<Article>({
  // selectId: (article: Article) => article.id,
  // sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState: ArticlesListOtherUserSectionSchema =
  articlesListOtherUserSectionNormalizer.getInitialState({
    isLoading: false,
    error: null,
  });

export const articlesListOtherUserSectionSlice = createSlice({
  name: 'articlesListOtherUserSection',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setOneArticle: (state, action: PayloadAction<Article>) => {
      articlesListOtherUserSectionNormalizer.setOne(state, action.payload);
    },
    setAllArticles: (state, action: PayloadAction<Article[]>) => {
      articlesListOtherUserSectionNormalizer.setAll(state, action.payload);
    },
    setManyArticle: (state, action: PayloadAction<Article[]>) => {
      articlesListOtherUserSectionNormalizer.setMany(state, action.payload);
    },
  },
});

export const { actions: articlesListOtherUserSectionActions } = articlesListOtherUserSectionSlice;
export const { reducer: articlesListOtherUserSectionReducer } = articlesListOtherUserSectionSlice;
export const articlesListOtherUserSectionThunks = { initThunk, fetchArticlesListOtherUserThunk };
const {
  selectAll: selectArticlesListAll,
  selectIds: selectArticlesListIds,
  selectById: selectArticleById,
} = articlesListOtherUserSectionNormalizer.getSelectors<StateSchema>(
  (state) =>
    state.articlesListOtherUserSection || articlesListOtherUserSectionNormalizer.getInitialState()
);
export const articlesListOtherUserSectionSelectors = {
  selectIsLoading,
  selectError,
  selectArticlesListAll,
  selectArticlesListIds,
  selectArticleById,
};
