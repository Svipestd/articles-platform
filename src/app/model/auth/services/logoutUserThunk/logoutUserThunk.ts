import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/const/localStorage';
import { authActions } from '../../slices/authSlice/authSlice';

export const logoutUserThunk = createAsyncThunk<void, void, ThunkConfig<any>>(
  'auth/logoutUserThunk',
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      thunkAPI.dispatch(authActions.setUser(null));
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
