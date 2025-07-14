import type { OnResponse, onResponseError } from "@shared-vendor/types";

const onResponse: OnResponse = (response) => response?.data?.data || response?.data || response;

const onResponseError: onResponseError = (error) => Promise.reject(error.response?.data || error.response);

export default {
  onResponse,
  onResponseError,
};
