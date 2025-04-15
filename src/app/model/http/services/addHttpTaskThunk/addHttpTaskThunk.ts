import { httpMiddleware } from './../../../../providers/StoreProvider/config/httpMiddleware';
import { AppDispatch, RootState } from '@/app/providers/StoreProvider';
import { HttpTask, HttpTaskState } from '@/app/types/httpTypes';
import { v4 as uuidv4 } from 'uuid';
import { httpActions } from '../../slices/httpSlice/httpSlice';
import { ApiResponse } from '@/shared/api/types';

interface AddHttpTaskData {
  requestHandler: (data?: any) => Promise<any>;
  name: string;
  requestData?: any;
  priority?: number;
}

export function addHttpTaskThunk<T>(data: AddHttpTaskData) {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<ApiResponse<T>> => {
    const state = getState();
    const tasksMap = state.http.tasksMap;
    const tasksList = Object.values(tasksMap);

    // If there are duplicated tasks
    if (tasksList.some((task) => task.name === data.name)) {
      const duplicatedTasks = tasksList.filter((task) => task.name === data.name)!;

      for (const duplicatedTask of duplicatedTasks) {
        if (duplicatedTask!.state === HttpTaskState.IDLE) {
          dispatch(httpActions.deleteTask(duplicatedTask.id));
          dispatch(httpMiddleware.deleteApiHandler({ id: duplicatedTask.id }));
        }

        if (duplicatedTask!.state === HttpTaskState.WAITING_RESPONSE) {
          dispatch(httpActions.setTask({ ...duplicatedTask, state: HttpTaskState.WAITING_CANCEL }));
        }
      }
    }

    const taskId = uuidv4();

    const newTask: HttpTask = {
      id: taskId,
      name: data.name,
      priority: data.priority || 1,
      requestData: data.requestData || null,
      responseData: null,
      state: HttpTaskState.IDLE,
    };

    dispatch(httpActions.setTask(newTask));
    dispatch(httpMiddleware.addApiHandler({ id: taskId, requestHandler: data.requestHandler }));

    const waitTaskFinished = (resolve: (value: unknown) => void) => {
      const state = getState();
      const tasksMap = state.http.tasksMap;

      // TODO
      if (!tasksMap[taskId]) return;

      if (tasksMap[taskId].state === HttpTaskState.FINISHED) {
        dispatch(httpActions.deleteTask(taskId));
        dispatch(httpMiddleware.deleteApiHandler({ id: taskId }));

        resolve(tasksMap[taskId].responseData);

        return;
      }

      setTimeout(() => waitTaskFinished(resolve), 1000);
    };

    const getTaskApiResponse = () => {
      return new Promise((resolve) => {
        waitTaskFinished(resolve);
      });
    };

    const response = await getTaskApiResponse();

    return response as ApiResponse<T>;
  };
}
