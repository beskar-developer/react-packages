import type {
  AxiosDefaults,
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export type Instance = AxiosInstance;

export type OnRequest = (
  config: InternalAxiosRequestConfig,
  instance: Instance,
) => InternalAxiosRequestConfig;

export type OnResponse = (response: AxiosResponse, instance: Instance) => AxiosResponse;
export type OnRequestError = (error: AxiosError, instance: Instance) => Promise<AxiosError>;
export type onResponseError = (error: AxiosError, instance: Instance) => Promise<AxiosError>;

export type HTTPClientInterceptor = Partial<{
  onResponse: OnResponse;
  onResponseError: onResponseError;
  onRequest: OnRequest;
  onRequestError: OnRequestError;
}>;
export type HttpClientOptions = Partial<{
  baseURL: string;
  domain: string;
  defaults: AxiosDefaults;
  headers: AxiosHeaders;
  interceptors: Array<HTTPClientInterceptor>;
}>;
