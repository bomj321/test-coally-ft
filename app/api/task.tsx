import axiosInstance from "../../axios";
import { env } from "@config/env";
import {
  ITask,
  ITaskPartial,
  ITaskResponse,
  ITaskResponseObject,
} from "@interfaces/ITask";

const findAll = async (params: unknown): Promise<ITaskResponse> => {
  return await axiosInstance
    .get(`${env.NEXT_PUBLIC_API_URL_BACKEND}/tasks`, {
      params: params,
    })
    .then((res) => {
      return {
        data: res.data,
        status: res.status,
      };
    })
    .catch((error) => {
      return {
        code: error.code,
        status: error.status,
      };
    });
};

const findById = async (id: string): Promise<ITaskResponseObject> => {
  return await axiosInstance
    .get(`${env.NEXT_PUBLIC_API_URL_BACKEND}/tasks/${id}`)
    .then((res) => {
      return {
        ...res.data,
        status: res.status,
      };
    })
    .catch((error) => {
      return {
        code: error.code,
        status: error.status,
      };
    });
};

const create = async (data: ITask): Promise<ITaskResponseObject> => {
  return await axiosInstance
    .post(`${env.NEXT_PUBLIC_API_URL_BACKEND}/tasks`, data)
    .then((res) => {
      return {
        ...res.data,
        status: res.status,
      };
    })
    .catch((error) => {
      return {
        code: error.code,
        status: error.status,
      };
    });
};

const update = async (
  id: string,
  data: ITaskPartial
): Promise<ITaskResponseObject> => {
  return await axiosInstance
    .put(`${env.NEXT_PUBLIC_API_URL_BACKEND}/tasks/${id}`, data)
    .then((res) => {
      return {
        ...res.data,
        status: res.status,
      };
    })
    .catch((error) => {
      return {
        code: error.code,
        status: error.status,
      };
    });
};

const remove = async (id: string): Promise<ITaskResponseObject> => {
  return await axiosInstance
    .delete(`${env.NEXT_PUBLIC_API_URL_BACKEND}/tasks/${id}`)
    .then((res) => {
      return {
        ...res.data,
        status: res.status,
      };
    })
    .catch((error) => {
      return {
        code: error.code,
        status: error.status,
      };
    });
};

export { findAll, findById, create, update, remove };
