import { toast } from "@shared-vendor/libs";

const DEFAULT_ERROR_MESSAGE = "خطا در انجام عملیات";
const DEFAULT_OFFLINE_ERROR_MESSAGE = "نیاز به اتصال به اینترنت";

const onResponse = (response) => {
  const message = response?.data?.data?.message;
  if (message) toast.show({ type: "success", message });

  return response;
};

const onResponseError = (responseError) => {
  const onlineErrorMessage = responseError.response?.data?.data?.message?.fa || DEFAULT_ERROR_MESSAGE;

  const message = window.navigator.onLine ? onlineErrorMessage : DEFAULT_OFFLINE_ERROR_MESSAGE;

  toast.show({
    message,
    type: "error",
  });

  return Promise.reject(responseError);
};

export default {
  onResponse,
  onResponseError,
};
