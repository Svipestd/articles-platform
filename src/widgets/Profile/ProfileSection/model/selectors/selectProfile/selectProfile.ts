import { StateSchema } from '@/app/providers/StoreProvider';

export const selectProfile = (state: StateSchema) => state.profileSection?.profile || null;
