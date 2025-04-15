import { StateSchema } from '@/app/providers/StoreProvider';

export const selectError = (state: StateSchema) => state.commentSection?.error || null;
