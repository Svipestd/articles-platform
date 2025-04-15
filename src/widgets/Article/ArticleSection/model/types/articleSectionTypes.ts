import { Article } from '@/entities/Article';

export interface ArticleSectionSchema {
  isLoading: boolean;
  error: string | null;
  article: Article | null;
}
