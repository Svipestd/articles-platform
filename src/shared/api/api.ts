import axios from 'axios';
import { LOCAL_STORAGE_TOKEN_KEY } from '../const/localStorage';

export const $api = axios.create({
  baseURL: __API__,
});

$api.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || '';

  return config;
});
