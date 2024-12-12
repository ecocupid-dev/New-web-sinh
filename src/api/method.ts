import { AxiosRequestConfig } from "axios";
import instance from "./instance";

type TResponse<T> = {
  Data?: T;
  Message: string;
  Success: boolean;
  TotalPage: number;
  Total: number;
  PageSize: number;
  PageIndex: number;
};

export default class BaseAPI<
  T extends unknown = unknown,
  P extends object = {}
> {
  private _router: string;

  constructor(router: string) {
    this._router = router;
  }

  get = async <TResult extends any = any>(
    url: string = "",
    axiosRequestConfig?: AxiosRequestConfig
  ) => {
    try {
      const res = await instance.get<TResponse<TResult>>(
        `/${this._router}${url}`,
        axiosRequestConfig
      );
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  post = async <TResult extends any = any>(
    url: string = "",
    data?: any,
    axiosRequestConfig?: AxiosRequestConfig
  ) => {
    try {
      const res = await instance.post<TResponse<TResult>>(
        `/${this._router}${url}`,
        data,
        axiosRequestConfig
      );
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  put = async <TResult extends any = any>(
    url: string = "",
    data?: any,
    axiosRequestConfig?: AxiosRequestConfig
  ) => {
    try {
      const res = await instance.put<TResponse<TResult>>(
        `/${this._router}${url}`,
        data,
        axiosRequestConfig
      );
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  delete = async <TResult extends any = any>(
    url: string = "",
    axiosRequestConfig?: AxiosRequestConfig
  ) => {
    try {
      const res = await instance.delete<TResponse<TResult>>(
        `/${this._router}${url}`,
        axiosRequestConfig
      );
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  gGetList = (
    params?: (any & Partial<P>) | any,
    axiosRequestConfig?: AxiosRequestConfig
  ) =>
    this.get<any>(undefined, {
      ...axiosRequestConfig,
      params: { OrderBy: "Id desc", ...params },
    });

  gGetById = (
    id: number | string,
    params?: Partial<P>,
    axiosRequestConfig?: AxiosRequestConfig
  ) => this.get<T>(`/${id}`, { params, ...axiosRequestConfig });

  gDelete = (id: number | string, axiosRequestConfig?: AxiosRequestConfig) =>
    this.delete(`/${id}`, axiosRequestConfig);

  gCreate = (data?: Partial<T>, axiosRequestConfig?: AxiosRequestConfig) =>
    this.post<T>(undefined, data, axiosRequestConfig);

  gUpdate = (data?: Partial<T>, axiosRequestConfig?: AxiosRequestConfig) =>
    this.put<T | T[]>(undefined, data, axiosRequestConfig);

  globalCRUD = {
    getList: this.gGetList,
    getByID: this.gGetById,
    create: this.gCreate,
    update: this.gUpdate,
    deleteByID: this.gDelete,
  };
}
