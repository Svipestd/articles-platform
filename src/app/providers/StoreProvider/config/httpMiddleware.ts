import { AxiosRequestConfig } from 'axios';

type HttpApiHandlerRequestHandler = (data?: any, options?: AxiosRequestConfig) => Promise<any>;

interface HttpApiHandler {
  abortController: AbortController | null;
  requestHandler: HttpApiHandlerRequestHandler;
}

interface HttpApiHandlersMap {
  [id: string]: HttpApiHandler;
}

export const httpApiHandlersMap: HttpApiHandlersMap = {};

export function http(api: any) {
  return (next: any) => (action: any) => {
    if (action.type === 'httpMiddleware/addApiHandler') {
      httpApiHandlersMap[action.payload.id] = {
        requestHandler: action.payload.requestHandler,
        abortController: null,
      };
    }

    if (action.type === 'httpMiddleware/editApiHandler') {
      httpApiHandlersMap[action.payload.id] = {
        ...httpApiHandlersMap[action.payload.id],
        ...action.payload.apiHandler,
      };
    }

    if (action.type === 'httpMiddleware/deleteApiHandler') {
      delete httpApiHandlersMap[action.payload.id];
    }

    const returnValue = next(action);
    return returnValue;
  };
}

const addApiHandler = (payload: { id: string; requestHandler: HttpApiHandlerRequestHandler }) => {
  return { type: 'httpMiddleware/addApiHandler', payload };
};

const editApiHandler = (payload: { id: string; apiHandler: HttpApiHandler }) => {
  return { type: 'httpMiddleware/editApiHandler', payload };
};

const deleteApiHandler = (payload: { id: string }) => {
  return { type: 'httpMiddleware/deleteApiHandler', payload };
};

export const httpMiddleware = { addApiHandler, editApiHandler, deleteApiHandler };
