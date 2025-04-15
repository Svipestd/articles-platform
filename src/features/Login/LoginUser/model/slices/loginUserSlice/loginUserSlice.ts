import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginUserSchema } from '../../types/loginUserTypes';
import { loginUserThunk } from '../../services/loginUserThunk/loginUserThunk';
import { selectIsLoading } from '../../selectors/selectIsLoading/selectIsLoading';
import { selectError } from '../../selectors/selectError/selectError';

const initialState: LoginUserSchema = {
  isLoading: false,
  error: null,
};

export const loginUserSlice = createSlice({
  name: 'loginUser',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { actions: loginUserActions } = loginUserSlice;
export const { reducer: loginUserReducer } = loginUserSlice;
export const loginUserThunks = { loginUserThunk };
export const loginUserSelectors = { selectIsLoading, selectError };
