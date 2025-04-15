import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileSectionSchema } from '../../types/profileSectionTypes';
import { FormMode } from '@/shared/types/common';
import { fetchProfileByIdThunk } from '../../services/fetchProfileByIdThunk/fetchProfileByIdThunk';
import { User } from '@/entities/User';
import { selectIsLoading } from '../../selectors/selectIsLoading/selectIsLoading';
import { selectError } from '../../selectors/selectError/selectError';
import { selectFormMode } from '../../selectors/selectFormMode/selectFormMode';
import { selectProfile } from '../../selectors/selectProfile/selectProfile';

const initialState: ProfileSectionSchema = {
  isLoading: false,
  error: null,
  formMode: FormMode.VIEW,
  profile: null,
};

export const profileSectionSlice = createSlice({
  name: 'profileSection',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFormMode: (state, action: PayloadAction<FormMode>) => {
      state.formMode = action.payload;
    },
    setProfile: (state, action: PayloadAction<User | null>) => {
      state.profile = action.payload;
    },
  },
});

export const { actions: profileSectionActions } = profileSectionSlice;
export const { reducer: profileSectionReducer } = profileSectionSlice;
export const profileSectionThunks = { fetchProfileByIdThunk };
export const profileSectionSelectors = {
  selectIsLoading,
  selectError,
  selectFormMode,
  selectProfile,
};
