import { AxiosResponse } from 'axios';
import { ApiResponseStatus, ApiResponseSuccess } from '../../types';

export function makeApiResponseSuccess<T>(response: AxiosResponse): ApiResponseSuccess<T> {
  console.log(response);

  return {
    status: ApiResponseStatus.SUCCESS,
    data: response.data,
    meta: {
      status: response.status
    }
  };
}
