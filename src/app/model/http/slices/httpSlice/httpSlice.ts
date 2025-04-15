import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HttpSchema, HttpTask, HttpTasksMap } from '@/app/types/httpTypes';
import { addHttpTaskThunk } from '../../services/addHttpTaskThunk/addHttpTaskThunk';
import { selectTasksMap } from '../../selectors/selectTasksMap/selectTasksMap';
import { initHttpThunk } from '../../services/initHttpThunk/initHttpThunk';
import { ObjectHelpers } from '@/shared/lib/object';

const initialState: HttpSchema = {
  tasksMap: {},
};

export const httpSlice = createSlice({
  name: 'http',
  initialState,
  reducers: {
    setTasksMap: (state, action: PayloadAction<HttpTasksMap>) => {
      state.tasksMap = action.payload;
    },
    setTask: (state, action: PayloadAction<HttpTask>) => {
      const task = action.payload;
      state.tasksMap[task.id] = task;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      state.tasksMap = ObjectHelpers.deleteKey(state.tasksMap, taskId);
    },
  },
});

export const { actions: httpActions } = httpSlice;
export const { reducer: httpReducer } = httpSlice;
export const httpThunks = { initHttpThunk, addHttpTaskThunk };
export const httpSelectors = { selectTasksMap };
