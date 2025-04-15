export enum ApiResponseStatus {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  CANCELED = 'CANCELED',
}

export interface ApiResponseMeta {
  status: number;
}

export interface ApiResponseDataFailure {
  error: string;
}

export interface ApiResponse<T> {
  status: ApiResponseStatus;
  data: ApiResponseDataFailure | T;
  meta: ApiResponseMeta;
}

export interface ApiResponseSuccess<T> {
  status: ApiResponseStatus.SUCCESS;
  data: T;
  meta: ApiResponseMeta;
}

export interface ApiResponseFailure {
  status: ApiResponseStatus.FAILURE | ApiResponseStatus.CANCELED;
  data: ApiResponseDataFailure;
  meta: ApiResponseMeta;
}

export enum GeneralAPIErrors {
  DEFAULT_API_ERROR = '00000000',
  NO_ACCESS = '00000001',
  CANCELED = '00000002',
}
