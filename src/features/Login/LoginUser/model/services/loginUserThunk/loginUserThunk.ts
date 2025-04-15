import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
  LOCAL_STORAGE_CURRENT_USER_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
} from '@/shared/const/localStorage';
import { authActions } from '@/app/model/auth/slices/authSlice/authSlice';
import { ApiResponseFailure, ApiResponseStatus } from '@/shared/api/types';
import { AuthAPI } from '@/shared/api/auth/auth';
import { loginUserActions } from '../../slices/loginUserSlice/loginUserSlice';

interface LoginUserData {
  username: string;
  password: string;
}

export const loginUserThunk = createAsyncThunk<void, LoginUserData, ThunkConfig<string>>(
  'loginUser/loginUserThunk',
  async (data, thunkAPI) => {
    thunkAPI.dispatch(loginUserActions.setIsLoading(true));

    try {
      const response = await AuthAPI.loginUser(data);

      if (response.status === ApiResponseStatus.SUCCESS) {
        const user = response.data as User;

        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, user.username);
        localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
        thunkAPI.dispatch(authActions.setUser(user));
        thunkAPI.dispatch(authActions.setIsShowLogin(false));
      } else {
        const error = response as ApiResponseFailure;

        thunkAPI.dispatch(authActions.setUser(null));
        thunkAPI.dispatch(loginUserActions.setError(error.data.error));
      }

      thunkAPI.dispatch(loginUserActions.setIsLoading(false));
    } catch (error: unknown) {
      console.error(error);

      thunkAPI.dispatch(loginUserActions.setIsLoading(false));
    }
  }
);
