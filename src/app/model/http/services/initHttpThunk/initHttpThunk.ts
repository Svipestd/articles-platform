import { AppDispatch, RootState } from '@/app/providers/StoreProvider';
import { httpActions } from '../../slices/httpSlice/httpSlice';
import {
  httpApiHandlersMap,
  httpMiddleware,
} from '@/app/providers/StoreProvider/config/httpMiddleware';
import { HttpTaskState } from '@/app/types/httpTypes';

const HTTP_LOOP_DELAY = 50;

export const initHttpThunk = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const loop = () => {
    const state = getState();
    const tasksMap = state.http.tasksMap;
    const tasksList = Object.values(tasksMap);
    const idleTasks = tasksList.filter((task) => task.state === HttpTaskState.IDLE);
    const waitingCancelTasks = tasksList.filter(
      (task) => task.state === HttpTaskState.WAITING_CANCEL
    );

    // If need to cancel some requests, do it
    if (waitingCancelTasks.length) {
      for (const task of waitingCancelTasks) {
        console.log(httpApiHandlersMap[task.id]);

        httpApiHandlersMap[task.id].abortController?.abort();
        dispatch(httpActions.deleteTask(task.id));
        dispatch(httpMiddleware.deleteApiHandler({ id: task.id }));
      }
    }

    // If there are tasks to handle, take first one and hanlde it
    if (idleTasks.length) {
      const task = idleTasks[0];
      const taskApiHandler = httpApiHandlersMap[task.id];

      if (!taskApiHandler) {
        setTimeout(loop, HTTP_LOOP_DELAY);
        return;
      }

      const abortController = new AbortController();

      // Set abortController to httpApiHandler
      dispatch(
        httpMiddleware.editApiHandler({
          id: task.id,
          apiHandler: { ...httpApiHandlersMap[task.id], abortController: abortController },
        })
      );

      dispatch(httpActions.setTask({ ...task, state: HttpTaskState.WAITING_RESPONSE }));

      taskApiHandler
        .requestHandler(task.requestData, { signal: abortController.signal })
        .then((response: any) => {
          dispatch(
            httpActions.setTask({ ...task, responseData: response, state: HttpTaskState.FINISHED })
          );
        });
    }

    setTimeout(loop, HTTP_LOOP_DELAY);
  };

  loop();
};
