import { FC, useEffect } from 'react';
import { useAppStore } from '@/shared/lib/hooks/useAppStore/useAppStore';
import {
  ReduxStoreWithManager,
  StateSchemaKey,
} from '@/app/providers/StoreProvider/config/StateSchema';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
  children?: React.ReactNode;
  removeAfterUnmount?: boolean;
  reducers: ReducersList;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const { children, removeAfterUnmount = false, reducers } = props;

  const store = useAppStore() as ReduxStoreWithManager;
  const reducerMap = store.reducerManager.getReducerMap();
  const dispatch = useAppDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      if (!reducerMap[name as StateSchemaKey]) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
