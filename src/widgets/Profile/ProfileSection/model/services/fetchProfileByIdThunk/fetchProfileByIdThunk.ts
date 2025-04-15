import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ApiResponseFailure, ApiResponseStatus } from '@/shared/api/types';
import { profileSectionActions } from '../../slices/profileSectionSlice/profileSectionSlice';
import { User } from '@/entities/User';
import { UserAPI } from '@/shared/api/user/user';

interface ViewProfileData {
  id: string;
}

export const fetchProfileByIdThunk = createAsyncThunk<void, ViewProfileData, ThunkConfig<string>>(
  'profileSection/fetchProfileByIdThunk',
  async (data, thunkAPI) => {
    thunkAPI.dispatch(profileSectionActions.setIsLoading(true));

    try {
      const response = await UserAPI.getUserById(data.id);

      if (response.status === ApiResponseStatus.SUCCESS) {
        const profile = response.data as User;

        thunkAPI.dispatch(profileSectionActions.setProfile(profile));
      } else {
        const error = response as ApiResponseFailure;

        thunkAPI.dispatch(profileSectionActions.setError(error.data.error));
      }

      thunkAPI.dispatch(profileSectionActions.setIsLoading(false));
    } catch (error: unknown) {
      console.error(error);

      thunkAPI.dispatch(profileSectionActions.setIsLoading(false));
    }
  }
);
