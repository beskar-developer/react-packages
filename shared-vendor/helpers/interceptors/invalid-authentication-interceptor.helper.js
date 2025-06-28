import { eventBusContext } from "@shared-vendor/libs";
const { eventBus } = eventBusContext;

const INVALID_AUTH_STATUS_CODE = 401;
const INVALID_AUTH_RESPONSE_CODE_LIST = ["tokenNotProvided", "invalidToken"];

const onResponseError = (responseError) => {
  const { response } = responseError;

  const statusCode = parseInt(response && response.status);
  const responseCode = response?.data?.meta?.code;

  if (statusCode === INVALID_AUTH_STATUS_CODE || INVALID_AUTH_RESPONSE_CODE_LIST.includes(responseCode))
    eventBus.emit("error:auth");

  return Promise.reject(responseError);
};

export default {
  onResponseError,
};
