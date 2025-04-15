import { StateSchema } from '@/app/providers/StoreProvider';

export const selectArticle = (state: StateSchema) => state.articleSection?.article || null;
