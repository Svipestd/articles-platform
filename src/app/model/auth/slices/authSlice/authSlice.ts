import { AuthSchema } from '@/app/types/authTypes';
import { User } from '@/entities/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initAuthThunk } from '../../services/initAuthThunk/initAuthThunk';
import { logoutUserThunk } from '../../services/logoutUserThunk/logoutUserThunk';
import { selectUser } from '../../selectors/selectUser/selectUser';
import { selectIsShowLogin } from '../../selectors/selectIsShowLogin/selectIsShowLogin';

const initialState: AuthSchema = {
  user: null,
  isShowLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setIsShowLogin: (state, action: PayloadAction<boolean>) => {
      state.isShowLogin = action.payload;
    },
  },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
export const authThunks = { initAuthThunk, logoutUserThunk };
export const authSelectors = { selectUser, selectIsShowLogin };
