import type { OnRequest, onResponseError } from "@shared-vendor/types";

import { Token } from "@shared-vendor/helpers";

const INVALID_AUTHENTICATION_STATUS_CODES = [401];
const isInvalidAuthentication = (error: Parameters<onResponseError>[0]) => {
  const code = error.status as number;

  const isAuthentication = error.config?.baseURL?.includes("auth");

  return INVALID_AUTHENTICATION_STATUS_CODES.includes(code) && !isAuthentication;
};

const addAccessHeaders = (request: Parameters<OnRequest>[0], token: string) => {
  request.headers = request.headers ?? {};
  request.headers[Token.ACCESS_HEADER_KEY] = token;
};

const onRequest: OnRequest = (request) => {
  const token = Token.getAccessToken();

  if (!token) return request;

  addAccessHeaders(request, token);

  return request;
};

const onInvalidAuthentication: onResponseError = async (error, instance) => {
  const token = await Token.requestAccessToken();

  const request = error.config!;

  addAccessHeaders(request, token);

  return instance.request(request);
};

const onResponseError: onResponseError = (error, instance) => {
  if (isInvalidAuthentication(error)) return onInvalidAuthentication(error, instance);

  return Promise.reject(error);
};

export default {
  onRequest,
  onResponseError,
};
