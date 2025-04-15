import { StateSchema } from '@/app/providers/StoreProvider';

export const selectTasksMap = (state: StateSchema) => state.http.tasksMap;
