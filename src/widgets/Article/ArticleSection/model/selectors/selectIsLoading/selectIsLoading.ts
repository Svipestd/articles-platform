import { StateSchema } from '@/app/providers/StoreProvider';

export const selectIsLoading = (state: StateSchema) => state.articleSection?.isLoading || false;
