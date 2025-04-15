import { StateSchema } from '@/app/providers/StoreProvider';

export const selectIsPageEnd = (state: StateSchema) => state.app.isPageEnd;
