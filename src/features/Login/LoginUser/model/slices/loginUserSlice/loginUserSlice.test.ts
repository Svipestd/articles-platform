import { loginUserActions, loginUserReducer } from './loginUserSlice';

describe('loginSlice', () => {
  test('Should work with initital state', () => {
    // expect(loginUserReducer(undefined, loginUserActions.setUsername('test'))).toEqual({
    //   username: 'test',
    //   password: '',
    //   isLoading: false,
    // });
  });

  test('Test setUsername', () => {
    // const state: DeepPartial<LoginSchema> = {
    //   username: '',
    // };
    // expect(loginReducer(state as LoginSchema, loginActions.setUsername('test'))).toEqual({
    //   username: 'test',
    // });
  });

  test('Test setPassword', () => {
    // const state: DeepPartial<LoginSchema> = {
    //   password: '',
    // };
    // expect(loginReducer(state as LoginSchema, loginActions.setPassword('test'))).toEqual({
    //   password: 'test',
    // });
  });
});
