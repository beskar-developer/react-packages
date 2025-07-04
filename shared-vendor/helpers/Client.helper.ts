import axios, { type AxiosInstance } from "axios";

import type {
  HttpClientOptions,
  OnRequest,
  OnRequestError,
  OnResponse,
  onResponseError,
} from "@shared-vendor/types";

import { normalizerInterceptor, tokenInterceptor } from "./interceptors";

const DEFAULT_INTERCEPTORS = [tokenInterceptor, normalizerInterceptor];

const isDev = import.meta.env.DEV;
const BASE_URL = getEnv("DEFAULT_URL");
const GATEWAY_SYSTEM = getEnv("GATEWAY_SYSTEM");

const DEFAULTS = {
  timeout: 2 * 60 * 1000,
};
const DEFAULT_HEADERS = {
  system: GATEWAY_SYSTEM,
  "gateway-system": GATEWAY_SYSTEM,
};

const DEFAULT_DOMAIN = "";

const onRequestFallback: OnRequest = (request) => request;
const onRequestErrorFallback: OnRequestError = (error) => Promise.reject(error);
const onResponseFallback: OnResponse = (response) => response;
const onResponseErrorFallback: onResponseError = (error) => Promise.reject(error);

class Client {
  client: AxiosInstance;

  constructor({
    baseURL = BASE_URL,
    domain = DEFAULT_DOMAIN,
    defaults,
    headers,
    interceptors = DEFAULT_INTERCEPTORS,
  }: HttpClientOptions = {}) {
    const normalizedDefaults = { ...DEFAULTS, ...defaults };
    const normalizedHeaders = { ...DEFAULT_HEADERS, ...headers };

    this.client = axios.create({
      ...normalizedDefaults,
      baseURL: `${!isDev ? baseURL : ""}${domain ? "/" : ""}${domain}`,
      headers: normalizedHeaders,
    });

    interceptors.forEach(
      ({
        onRequest = onRequestFallback,
        onRequestError = onRequestErrorFallback,
        onResponse = onResponseFallback,
        onResponseError = onResponseErrorFallback,
      }) => {
        this.client.interceptors.request.use(onRequest, onRequestError);
        this.client.interceptors.response.use(onResponse, onResponseError);
      },
    );
  }

  getInstance() {
    return this.client;
  }
}

export default Client;
