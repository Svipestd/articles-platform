import { Article } from '@/entities/Article';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticlesListAllSectionSchema extends EntityState<Article, string> {
  isLoading: boolean;
  error: string | null;
}
