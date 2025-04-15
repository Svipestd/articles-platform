import { User } from '@/entities/User';
import { makeApiResponseFailure } from '@/shared/api/helpers/makeApiResponseFailure/makeApiResponseFailure';
import { makeApiResponseSuccess } from '@/shared/api/helpers/makeApiResponseSuccess/makeApiResponseSuccess';
import { $api } from '@/shared/api/api';
import { ApiResponse } from '@/shared/api/types';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

export enum UserAPIEditUserByIdErrors {
  USER_NOT_FOUND = '00020001',
}

export interface UserAPIEditUserByIdRequestData {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string | null;
  currency: Currency | null;
  country: Country | null;
  city: string | null;
}

export const editUserById = async (
  id: string,
  data: UserAPIEditUserByIdRequestData
): Promise<ApiResponse<User>> => {
  try {
    const response = await $api.put<User>(`/users/${id}`, data);

    return makeApiResponseSuccess(response);
  } catch (error) {
    return makeApiResponseFailure(error);
  }
};
