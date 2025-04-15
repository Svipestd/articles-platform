import { StateSchema } from '@/app/providers/StoreProvider';

export const selectError = (state: StateSchema) =>
  state.articlesListOtherUserSection?.error || null;
