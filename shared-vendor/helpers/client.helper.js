import axios from "axios";

import {
  invalidAuthenticationInterceptor,
  loadingInterceptor,
  normalizerInterceptor,
  toastInterceptor,
  tokenInterceptor,
} from "./interceptors";

const DEFAULT_INTERCEPTORS = [
  tokenInterceptor,
  loadingInterceptor,
  toastInterceptor,
  invalidAuthenticationInterceptor,
  normalizerInterceptor,
];

const isDev = import.meta.env.DEV;
const BASE_URL = getEnv("DEFAULT_URL");
const GATEWAY_SYSTEM = getEnv("GATEWAY_SYSTEM");
const CORS_KEY = getEnv("CORS_KEY");

const DEFAULTS = {
  timeout: 2 * 60 * 1000,
};
const DEFAULT_HEADERS = {
  system: GATEWAY_SYSTEM,
  "gateway-system": GATEWAY_SYSTEM,
  [CORS_KEY]: true,
};

const DEFAULT_DOMAIN = "";

const DEFAULT_POLICY = {
  interceptors: "concat", // concat, reverseConcat or replace
  headers: "merge", // merge or replace
  defaults: "merge", // merge or replace
};

const onRequestFallback = (request) => request;
const onRequestErrorFallback = (error) => Promise.reject(error);
const onResponseFallback = (response) => response;
const onResponseErrorFallback = (error) => Promise.reject(error);

const normalizeObjectByPolicy = ({ value = {}, initial = {}, policy = "merge" }) => {
  if (policy === "merge") return { ...initial, ...value };

  if (policy === "replace") return value;
};

const normalizeArrayByPolicy = ({ value = [], initial = [], policy = "concat" }) => {
  if (policy === "concat") return [...initial, ...value];

  if (policy === "reverseConcat") return [...value, ...initial];

  if (policy === "replace") return value;
};

const normalizeByPolicy = ({ policy = {}, defaults = {}, headers = {}, interceptors = [] }) => {
  const normalizedPolicy = { ...policy, ...DEFAULT_POLICY };

  const normalizedDefaults = normalizeObjectByPolicy({
    value: defaults,
    initial: DEFAULTS,
    policy: normalizedPolicy.defaults,
  });

  const normalizedHeaders = normalizeObjectByPolicy({
    value: headers,
    initial: DEFAULT_HEADERS,
    policy: normalizeByPolicy.headers,
  });

  const normalizedInterceptors = normalizeArrayByPolicy({
    value: interceptors,
    initial: DEFAULT_INTERCEPTORS,
    policy: normalizedPolicy.interceptors,
  });

  return {
    defaults: normalizedDefaults,
    headers: normalizedHeaders,
    interceptors: normalizedInterceptors,
  };
};

class Client {
  constructor({ baseURL = BASE_URL, domain = DEFAULT_DOMAIN, defaults, headers, interceptors, policy } = {}) {
    const {
      defaults: normalizedDefaults,
      headers: normalizedHeaders,
      interceptors: normalizedInterceptors,
    } = normalizeByPolicy({
      defaults,
      headers,
      interceptors,
      policy,
    });

    this.client = axios.create({
      ...normalizedDefaults,
      baseURL: `${!isDev ? baseURL : ""}${domain ? "/" : ""}${domain}`,
      headers: normalizedHeaders,
    });

    normalizedInterceptors.forEach(
      ({
        onRequest = onRequestFallback,
        onRequestError = onRequestErrorFallback,
        onResponse = onResponseFallback,
        onResponseError = onResponseErrorFallback,
      }) => {
        this.client.interceptors.request.use(
          (...args) => onRequest(...args, this.client),
          (...args) => onRequestError(...args, this.client),
        );
        this.client.interceptors.response.use(
          (...args) => onResponse(...args, this.client),
          (...args) => onResponseError(...args, this.client),
        );
      },
    );
  }

  getInstance() {
    return this.client;
  }
}

export default Client;
