import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppSchema } from '../../../../types/appTypes';
import { initAppThunk } from '../../services/initAppThunk/initAppThunk';
import { selectInited } from '../../selectors/selectInited/selectInited';
import { selectIsPageEnd } from '../../selectors/selectIsPageEnd/selectIsPageEnd';

const initialState: AppSchema = {
  inited: false,
  isPageEnd: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInited: (state, action: PayloadAction<boolean>) => {
      state.inited = action.payload;
    },
    setIsPageEnd: (state, action: PayloadAction<boolean>) => {
      state.isPageEnd = action.payload;
    },
  },
});

export const { actions: appActions } = appSlice;
export const { reducer: appReducer } = appSlice;
export const appThunks = { initAppThunk };
export const appSelectors = { selectInited, selectIsPageEnd };
