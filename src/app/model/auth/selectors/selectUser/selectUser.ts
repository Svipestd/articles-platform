import { StateSchema } from '@/app/providers/StoreProvider';

export const selectUser = (state: StateSchema) => state.auth.user;
