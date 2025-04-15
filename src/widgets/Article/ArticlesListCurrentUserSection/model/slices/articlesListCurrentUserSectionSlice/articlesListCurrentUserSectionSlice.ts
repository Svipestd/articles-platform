import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { selectIsLoading } from '../../selectors/selectIsLoading/selectIsLoading';
import { selectError } from '../../selectors/selectError/selectError';
import { ArticlesListCurrentUserSectionSchema } from '../../types/articlesListCurrentUserSectionTypes';
import { Article } from '@/entities/Article';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchArticlesListCurrentUserThunk } from '../../services/fetchArticlesListCurrentUserThunk/fetchArticlesListCurrentUserThunk';
import { initThunk } from '../../services/initThunk/initThunk';

export const articlesListCurrentUserSectionNormalizer = createEntityAdapter<Article>({
  // selectId: (article: Article) => article.id,
  // sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState: ArticlesListCurrentUserSectionSchema =
  articlesListCurrentUserSectionNormalizer.getInitialState({
    isLoading: false,
    error: null,
  });

export const articlesListCurrentUserSectionSlice = createSlice({
  name: 'articlesListCurrentUserSection',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setOneArticle: (state, action: PayloadAction<Article>) => {
      articlesListCurrentUserSectionNormalizer.setOne(state, action.payload);
    },
    setAllArticles: (state, action: PayloadAction<Article[]>) => {
      articlesListCurrentUserSectionNormalizer.setAll(state, action.payload);
    },
    setManyArticle: (state, action: PayloadAction<Article[]>) => {
      articlesListCurrentUserSectionNormalizer.setMany(state, action.payload);
    },
  },
});

export const { actions: articlesListCurrentUserSectionActions } =
  articlesListCurrentUserSectionSlice;
export const { reducer: articlesListCurrentUserSectionReducer } =
  articlesListCurrentUserSectionSlice;
export const articlesListCurrentUserSectionThunks = {
  initThunk,
  fetchArticlesListCurrentUserThunk,
};
const {
  selectAll: selectArticlesListAll,
  selectIds: selectArticlesListIds,
  selectById: selectArticleById,
} = articlesListCurrentUserSectionNormalizer.getSelectors<StateSchema>(
  (state) =>
    state.articlesListCurrentUserSection ||
    articlesListCurrentUserSectionNormalizer.getInitialState()
);
export const articlesListCurrentUserSectionSelectors = {
  selectIsLoading,
  selectError,
  selectArticlesListAll,
  selectArticlesListIds,
  selectArticleById,
};
