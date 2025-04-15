// import { loginByUsername } from './loginUser';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

describe('loginByUsername.test', () => {
  test('Success login', async () => {
    // const axiosPayload = { username: 'test', id: 1 };
    // const axiosReturnValue = { data: axiosPayload };
    // const thunk = new TestAsyncThunk(loginByUsername);
    // thunk.api.post.mockReturnValue(Promise.resolve(axiosReturnValue));
    // const result = await thunk.callThunk({ username: '123', password: '123' });
    // expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(axiosPayload));
    // expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    // expect(thunk.api.post).toHaveBeenCalled();
    // expect(result.meta.requestStatus).toBe('fulfilled');
    // expect(result.payload).toBe(axiosPayload);
  });

  test('Error login', async () => {
    // const axiosReturnValue = { status: 403 };
    // const thunk = new TestAsyncThunk(loginByUsername);
    // thunk.api.post.mockReturnValue(Promise.resolve(axiosReturnValue));
    // const result = await thunk.callThunk({ username: '123', password: '123' });
    // expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    // expect(thunk.api.post).toHaveBeenCalled();
    // expect(result.meta.requestStatus).toBe('rejected');
    // expect(result.payload).toBe('error');
  });
});
