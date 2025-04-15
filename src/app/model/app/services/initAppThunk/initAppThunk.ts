import { authThunks } from '../../../auth/slices/authSlice/authSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { appActions } from '../../slices/appSlice/appSlice';
import { httpThunks } from '@/app/model/http/slices/httpSlice/httpSlice';

export const initAppThunk = createAsyncThunk<void, void, ThunkConfig<any>>(
  'app/initAppThunk',
  async (_, thunkAPI) => {
    const authInitResult = await thunkAPI.dispatch(authThunks.initAuthThunk());
    thunkAPI.dispatch(httpThunks.initHttpThunk());

    // For future logic
    if (authInitResult.meta.requestStatus === 'fulfilled') {
      thunkAPI.dispatch(appActions.setInited(true));
    } else {
      thunkAPI.dispatch(appActions.setInited(true));
    }
  }
);
