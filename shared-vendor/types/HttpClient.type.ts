import type {
  AxiosDefaults,
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export type OnRequest = (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
export type OnResponse = (response: AxiosResponse) => AxiosResponse;
export type OnRequestError = (error: AxiosError) => Promise<AxiosError>;
export type onResponseError = (error: AxiosError) => Promise<AxiosError>;

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
