import { StateSchema } from '@/app/providers/StoreProvider';

export const selectFormMode = (state: StateSchema) => state.profileSection?.formMode || null;
