import { loading } from "@shared-vendor/libs";

const onRequest = (request) => {
  const { url } = request;

  loading.show({ key: url });

  return request;
};

const onResponse = (response) => {
  const {
    config: { url },
  } = response;

  loading.hide({ key: url });

  return response;
};

const onResponseError = (response) => {
  const {
    config: { url },
  } = response;

  loading.hide({ key: url });

  return Promise.reject(response);
};

export default {
  onRequest,
  onResponse,
  onResponseError,
};
