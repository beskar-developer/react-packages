/* eslint-disable @typescript-eslint/no-explicit-any */
import type { OnResponse, onResponseError } from "@shared-vendor/types";

const onResponse: OnResponse = (response) => {
  const message = response?.data?.message;

  if (message) toast.success(message);

  return response;
};

const onResponseError: onResponseError = (error) => {
  const message = (error?.response?.data as any)?.message;

  if (message) toast.error(message);

  return Promise.reject(error);
};

export default {
  onResponse,
  onResponseError,
};
