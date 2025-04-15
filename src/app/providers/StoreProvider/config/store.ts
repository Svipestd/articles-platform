import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';
import { $api } from '@/shared/api/api';
import { NavigateFunction } from 'react-router-dom';
import { appReducer } from '@/app/model/app/slices/appSlice/appSlice';
import { authReducer } from '@/app/model/auth/slices/authSlice/authSlice';
import { dataListManagerReducer } from '@/features/DataListManager/model/slices/dataListManagerSlice/dataListManagerSlice';
import { httpReducer } from '@/app/model/http/slices/httpSlice/httpSlice';
import { http } from './httpMiddleware';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: NavigateFunction
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    app: appReducer,
    auth: authReducer,
    http: httpReducer,
    dataListManager: dataListManagerReducer,
    ...asyncReducers,
  };

  const reducerManager = createReducerManager(rootReducers);

  const thunkExtraArg: ThunkExtraArg = {
    api: $api,
    navigate: navigate as NavigateFunction,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<StateSchema>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: thunkExtraArg },
        serializableCheck: {
          ignoredActions: [
            'httpMiddleware/addApiHandler',
            'httpMiddleware/editApiHandler',
            'httpMiddleware/deleteApiHandler',
          ],
        },
      }).concat(http),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export const store = createReduxStore();

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;
