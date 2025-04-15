import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
  LOCAL_STORAGE_CURRENT_USER_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
} from '@/shared/const/localStorage';
import { User } from '@/entities/User';
import { ApiResponseStatus } from '@/shared/api/types';
import { authActions } from '../../slices/authSlice/authSlice';
import { AuthAPI } from '@/shared/api/auth/auth';

export const initAuthThunk = createAsyncThunk<void, void, ThunkConfig<any>>(
  'auth/initAuthThunk',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      if (!token) return;

      const authUser = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
      if (authUser) thunkAPI.dispatch(authActions.setUser(JSON.parse(authUser)));

      const response = await AuthAPI.getCurrentUser();

      if (response.status === ApiResponseStatus.SUCCESS) {
        const user = response.data as User;

        thunkAPI.dispatch(authActions.setUser(user));
      } else {
        thunkAPI.dispatch(authActions.setUser(null));
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);

        return thunkAPI.rejectWithValue(response);
      }
    } catch (error: unknown) {
      console.error(error);

      return thunkAPI.rejectWithValue(error);
    }
  }
);
