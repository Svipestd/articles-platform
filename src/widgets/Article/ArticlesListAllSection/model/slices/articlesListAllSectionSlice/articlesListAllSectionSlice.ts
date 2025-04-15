import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { selectIsLoading } from '../../selectors/selectIsLoading/selectIsLoading';
import { selectError } from '../../selectors/selectError/selectError';
import { ArticlesListAllSectionSchema } from '../../types/articlesListAllSectionTypes';
import { Article } from '@/entities/Article';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchArticlesListAllThunk } from '../../services/fetchArticlesListAllThunk/fetchArticlesListAllThunk';
import { initThunk } from '../../services/initThunk/initThunk';

export const articlesListAllSectionNormalizer = createEntityAdapter<Article>({
  // selectId: (article: Article) => article.id,
  // sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState: ArticlesListAllSectionSchema = articlesListAllSectionNormalizer.getInitialState(
  {
    isLoading: false,
    error: null,
  }
);

export const articlesListAllSectionSlice = createSlice({
  name: 'articlesListAllSection',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setOneArticle: (state, action: PayloadAction<Article>) => {
      articlesListAllSectionNormalizer.setOne(state, action.payload);
    },
    setAllArticles: (state, action: PayloadAction<Article[]>) => {
      articlesListAllSectionNormalizer.setAll(state, action.payload);
    },
    setManyArticle: (state, action: PayloadAction<Article[]>) => {
      articlesListAllSectionNormalizer.setMany(state, action.payload);
    },
  },
});

export const { actions: articlesListAllSectionActions } = articlesListAllSectionSlice;
export const { reducer: articlesListAllSectionReducer } = articlesListAllSectionSlice;
export const articlesListAllSectionThunks = { initThunk, fetchArticlesListAllThunk };
const {
  selectAll: selectArticlesListAll,
  selectIds: selectArticlesListIds,
  selectById: selectArticleById,
} = articlesListAllSectionNormalizer.getSelectors<StateSchema>(
  (state) => state.articlesListAllSection || articlesListAllSectionNormalizer.getInitialState()
);
export const articlesListAllSectionSelectors = {
  selectIsLoading,
  selectError,
  selectArticlesListAll,
  selectArticlesListIds,
  selectArticleById,
};
