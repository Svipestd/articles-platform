import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ApiResponseFailure, ApiResponseStatus } from '@/shared/api/types';
import { articleSectionActions } from '../../slices/articleSectionSlice/articleSectionSlice';
import { Article } from '@/entities/Article';
import { ArticleAPI } from '@/shared/api/article/article';

interface ViewArticleData {
  id: string;
}

export const fetchArticleThunk = createAsyncThunk<void, ViewArticleData, ThunkConfig<string>>(
  'articleSection/fetchArticleThunk',
  async (data, thunkAPI) => {
    thunkAPI.dispatch(articleSectionActions.setIsLoading(true));

    try {
      const response = await ArticleAPI.getArticleById(data.id);

      if (response.status === ApiResponseStatus.SUCCESS) {
        const article = response.data as Article;

        thunkAPI.dispatch(articleSectionActions.setArticle(article));
      } else {
        const error = response as ApiResponseFailure;

        thunkAPI.dispatch(articleSectionActions.setError(error.data.error));
      }

      thunkAPI.dispatch(articleSectionActions.setIsLoading(false));
    } catch (error: unknown) {
      console.error(error);

      thunkAPI.dispatch(articleSectionActions.setIsLoading(false));
    }
  }
);
