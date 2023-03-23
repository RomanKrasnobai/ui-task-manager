export interface ToastEventsModel {
  title: string;
  message: string;
  type: string;
}

export enum ToastEventsType {
  SUCCESS = 'Success',
  FAILED = 'Failed'
}
