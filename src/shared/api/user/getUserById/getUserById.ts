import { User } from '@/entities/User';
import { makeApiResponseFailure } from '@/shared/api/helpers/makeApiResponseFailure/makeApiResponseFailure';
import { makeApiResponseSuccess } from '@/shared/api/helpers/makeApiResponseSuccess/makeApiResponseSuccess';
import { $api } from '@/shared/api/api';
import { ApiResponse } from '@/shared/api/types';

export enum UserAPIGetUserByIdErrors {
  USER_NOT_FOUND = '00020001',
}

export const getUserById = async (id: string): Promise<ApiResponse<User>> => {
  try {
    const response = await $api.get<User>(`/users/${id}`);

    return makeApiResponseSuccess(response);
  } catch (error) {
    return makeApiResponseFailure(error);
  }
};
