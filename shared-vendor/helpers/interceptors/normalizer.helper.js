const onResponse = (response) => response?.data?.data || response?.data || response;

const onResponseError = (error) => Promise.reject(error.response?.data);

export default {
  onResponse,
  onResponseError,
};
