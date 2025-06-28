import { eventBusContext } from "@shared-vendor/libs";
const { eventBus } = eventBusContext;

let token = null;

eventBus.on("token:change", (newToken) => {
  token = newToken;
});

const onRequest = (request) => {
  if (token) {
    request.headers["gateway-token"] = token;
    request.headers["token"] = token;
  }

  return request;
};

export default {
  onRequest,
};
