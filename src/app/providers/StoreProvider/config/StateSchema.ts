import { AppSchema } from '@/app/types/appTypes';
import { AuthSchema } from '@/app/types/authTypes';
import { LoginUserSchema } from '@/features/Login/LoginUser';
import { ArticleSectionSchema } from '@/widgets/Article/ArticleSection';
import { ProfileSectionSchema } from '@/widgets/Profile/ProfileSection';
import { Action, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { CommentCreateSchema } from '@/features/Comment/CommentCreate';
import { CommentSectionSchema } from '@/widgets/Comment/CommentSection';
import { ArticlesListCurrentUserSectionSchema } from '@/widgets/Article/ArticlesListCurrentUserSection';
import { ArticlesListOtherUserSectionSchema } from '@/widgets/Article/ArticlesListOtherUserSection';
import { DataListManagerSchema } from '@/features/DataListManager/model/types/dataListManagerTypes';
import { HttpSchema } from '@/app/types/httpTypes';
import { ArticlesListAllSectionSchema } from '@/widgets/Article/ArticlesListAllSection/model/types/articlesListAllSectionTypes';

export interface StateSchema {
  app: AppSchema;
  auth: AuthSchema;
  http: HttpSchema;
  dataListManager: DataListManagerSchema;

  loginUser?: LoginUserSchema;

  profileSection?: ProfileSectionSchema;
  profileEdit?: ProfileSectionSchema;

  commentSection?: CommentSectionSchema;
  commentCreate?: CommentCreateSchema;

  articlesListAllSection?: ArticlesListAllSectionSchema;
  articlesListCurrentUserSection?: ArticlesListCurrentUserSectionSchema;
  articlesListOtherUserSection?: ArticlesListOtherUserSectionSchema;
  articleSection?: ArticleSectionSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: Action) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate: NavigateFunction;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
