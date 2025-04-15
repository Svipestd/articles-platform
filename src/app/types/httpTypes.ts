export enum HttpTaskState {
  IDLE = 'IDLE',
  WAITING_RESPONSE = 'WAITING_RESPONSE',
  FINISHED = 'FINISHED',
  WAITING_CANCEL = 'WAITING_CANCEL',
  CANCELED = 'CANCELED',
}

export interface HttpTask {
  id: string;
  name: string;
  state: HttpTaskState;
  priority: number;
  requestData: any;
  responseData: any;
}

export type HttpTasksMap = Record<string, HttpTask>;

export interface HttpSchema {
  tasksMap: HttpTasksMap;
}
