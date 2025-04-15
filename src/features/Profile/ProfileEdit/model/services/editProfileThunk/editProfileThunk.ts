import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ApiResponseFailure, ApiResponseStatus } from '@/shared/api/types';
import { profileEditActions } from '../../slices/profileEditSlice/profileEditSlice';
import { profileSectionActions } from '@/widgets/Profile/ProfileSection/model/slices/profileSectionSlice/profileSectionSlice';
import { User } from '@/entities/User';
import { UserAPI } from '@/shared/api/user/user';
import { FormMode } from '@/shared/types/common';
import { UserAPIEditUserByIdRequestData } from '@/shared/api/user/editUserById/editUserById';

interface ProfileEditData {
  id: string;
  profile: UserAPIEditUserByIdRequestData;
}

export const editProfileThunk = createAsyncThunk<void, ProfileEditData, ThunkConfig<string>>(
  'profileEdit/profileEditThunk',
  async (data, thunkAPI) => {
    thunkAPI.dispatch(profileEditActions.setIsLoading(true));

    try {
      const response = await UserAPI.editUserById(data.id, data.profile);

      if (response.status === ApiResponseStatus.SUCCESS) {
        const profile = response.data as User;

        thunkAPI.dispatch(profileSectionActions.setProfile(profile));
        thunkAPI.dispatch(profileSectionActions.setFormMode(FormMode.VIEW));
      } else {
        const error = response as ApiResponseFailure;

        thunkAPI.dispatch(profileEditActions.setError(error.data.error));
      }

      thunkAPI.dispatch(profileEditActions.setIsLoading(false));
    } catch (error: unknown) {
      console.error(error);

      thunkAPI.dispatch(profileEditActions.setIsLoading(false));
    }
  }
);
