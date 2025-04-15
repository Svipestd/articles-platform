import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { loginUserReducer } from '@/features/Login/LoginUser/model/slices/loginUserSlice/loginUserSlice';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
  loginUser: loginUserReducer,
  // profile: profileReducer,
};

export const StoreDecorator = (
  Story: any,
  state?: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList
) => {
  return (
    <StoreProvider
      initialState={state}
      asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
      <Story />
    </StoreProvider>
  );
};
