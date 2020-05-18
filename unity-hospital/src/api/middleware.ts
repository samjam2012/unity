import axios, { AxiosResponse } from "axios";
import { createProxyMiddleware } from "http-proxy-middleware";
const proxyApi = (app: any) => {
  app.use(
    createProxyMiddleware("/api-users", {
      target: "http://localhost:8090/"
    })
  );
  app.use(
    createProxyMiddleware("/api-events", {
      target: "http://localhost:4433/"
    })
  );
};

const createApi = (baseUrl: string) => async (
  path: string,
  method: "GET" | "POST" | "PUT" = "GET",
  data?: any
) => {
  const options = {
    url: `${baseUrl}${path}`,
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8"
    },
    data
  };

  let res: any;
  await axios(options)
    .then(response => {
      res = response;
    })
    .catch(e => {
      throw e;
    });

  return res as AxiosResponse;
};

export { createApi, proxyApi };
