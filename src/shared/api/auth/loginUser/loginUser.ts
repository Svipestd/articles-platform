import { User } from '@/entities/User';
import { makeApiResponseFailure } from '@/shared/api/helpers/makeApiResponseFailure/makeApiResponseFailure';
import { makeApiResponseSuccess } from '@/shared/api/helpers/makeApiResponseSuccess/makeApiResponseSuccess';
import { $api } from '@/shared/api/api';
import { ApiResponse } from '@/shared/api/types';

export enum AuthAPILoginUserErrors {
  INVALID_CREDENTIALS = '00010001',
}

export interface AuthAPILoginUserRequestData {
  username: string;
  password: string;
}

export const loginUser = async (data: AuthAPILoginUserRequestData): Promise<ApiResponse<User>> => {
  try {
    const response = await $api.post<User>('/login', data);

    return makeApiResponseSuccess(response);
  } catch (error) {
    return makeApiResponseFailure(error);
  }
};
