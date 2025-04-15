import { StateSchema } from '@/app/providers/StoreProvider';

export const selectDataListOptionsMap = (state: StateSchema) =>
  state.dataListManager.dataListOptionsMap;
