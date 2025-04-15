import { StateSchema } from '@/app/providers/StoreProvider';

export const selectInited = (state: StateSchema) => state.app.inited;
