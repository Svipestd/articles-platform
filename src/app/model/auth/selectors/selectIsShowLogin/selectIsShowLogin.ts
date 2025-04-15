import { StateSchema } from '@/app/providers/StoreProvider';

export const selectIsShowLogin = (state: StateSchema) => state.auth.isShowLogin;
