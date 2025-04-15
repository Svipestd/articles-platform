import { ApiResponseFailure, ApiResponseStatus, GeneralAPIErrors } from '../../types';
import { AxiosError } from 'axios';

export function makeApiResponseFailure(error: any): ApiResponseFailure {
  console.log(error);

  if (error.code === 'ERR_CANCELED') {
    return {
      status: ApiResponseStatus.CANCELED,
      data: {
        error: GeneralAPIErrors.CANCELED,
      },
      meta: {
        status: 500,
      },
    };
  }

  if (!error.status || !error.response) {
    return {
      status: ApiResponseStatus.FAILURE,
      data: {
        error: GeneralAPIErrors.DEFAULT_API_ERROR,
      },
      meta: {
        status: 500,
      },
    };
  }

  const axiosError = error as AxiosError<any>;

  if (axiosError.status === 403) {
    return {
      status: ApiResponseStatus.FAILURE,
      data: {
        error: GeneralAPIErrors.NO_ACCESS,
      },
      meta: {
        status: axiosError.status,
      },
    };
  }

  return {
    status: ApiResponseStatus.FAILURE,
    data: {
      error: axiosError.response?.data?.errorUid || GeneralAPIErrors.DEFAULT_API_ERROR,
    },
    meta: {
      status: axiosError.status || 500,
    },
  };
}
