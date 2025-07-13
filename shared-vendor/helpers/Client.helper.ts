import axios from "axios";

import type {
  HttpClientOptions,
  Instance,
  OnRequest,
  OnRequestError,
  OnResponse,
  onResponseError,
} from "@shared-vendor/types";

import { normalizerInterceptor, tokenInterceptor } from "./interceptors";

const DEFAULT_INTERCEPTORS = [tokenInterceptor, normalizerInterceptor];

const isDev = import.meta.env.DEV;
const BASE_URL = getEnv("DEFAULT_URL");

const DEFAULTS = {
  timeout: 2 * 60 * 1000,
};

const DEFAULT_DOMAIN = "";

const onRequestFallback: OnRequest = (request) => request;
const onRequestErrorFallback: OnRequestError = (error) => Promise.reject(error);
const onResponseFallback: OnResponse = (response) => response;
const onResponseErrorFallback: onResponseError = (error) => Promise.reject(error);

class Client {
  client: Instance;

  constructor({
    baseURL = BASE_URL,
    domain = DEFAULT_DOMAIN,
    defaults,
    headers,
    interceptors = DEFAULT_INTERCEPTORS,
  }: HttpClientOptions = {}) {
    const normalizedDefaults = { ...DEFAULTS, ...defaults };

    const instance = axios.create({
      ...normalizedDefaults,
      baseURL: `${!isDev ? baseURL : ""}${domain ? "/" : ""}${domain}`,
      headers,
    });

    this.client = instance;

    interceptors.forEach(
      ({
        onRequest = onRequestFallback,
        onRequestError = onRequestErrorFallback,
        onResponse = onResponseFallback,
        onResponseError = onResponseErrorFallback,
      }) => {
        this.client.interceptors.request.use(
          (request) => onRequest(request, instance),
          (error) => onRequestError(error, instance),
        );
        this.client.interceptors.response.use(
          (response) => onResponse(response, instance),
          (error) => onResponseError(error, instance),
        );
      },
    );
  }

  getInstance() {
    return this.client;
  }
}

export default Client;
