import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { editProfileThunk } from '../../services/editProfileThunk/editProfileThunk';
import { ProfileEditSchema } from '../../types/profileEditTypes';
import { selectIsLoading } from '../../selectors/selectIsLoading/selectIsLoading';
import { selectError } from '../../selectors/selectError/selectError';

const initialState: ProfileEditSchema = {
  isLoading: false,
  error: null,
};

export const profileEditSlice = createSlice({
  name: 'profileEdit',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { actions: profileEditActions } = profileEditSlice;
export const { reducer: profileEditReducer } = profileEditSlice;
export const profileEditThunks = { editProfileThunk };
export const profileEditSelectors = { selectIsLoading, selectError };
