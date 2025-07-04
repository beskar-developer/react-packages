import { eventBusContext } from "@shared-vendor/libs";
import type { OnRequest } from "@shared-vendor/types";

const { eventBus } = eventBusContext;

let token: string = "";

eventBus.on("token:change", (newToken) => {
  token = newToken as string;
});

const onRequest: OnRequest = (request) => {
  if (!token) return request;

  request.headers = request.headers ?? {};
  request.headers["gateway-token"] = token;
  request.headers["token"] = token;

  return request;
};

export default {
  onRequest,
};
