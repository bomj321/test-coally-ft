export interface ITask {
  _id?: string;
  title: string;
  description: string;
  state: string;
}

export interface ITaskState {
  name: string;
  code: string;
}

export interface ITaskPartial extends Partial<ITask> {}

export interface ITaskResponse {
  code?: string;
  status: number;
  data?: Array<ITask>;
}

export interface ITaskResponseObject {
  code?: string;
  status: number;
  data: ITask;
}
