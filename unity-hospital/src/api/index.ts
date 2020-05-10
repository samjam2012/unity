import axios, { AxiosResponse } from "axios";

export * from "./users";
export * from "./analytics";
const EVENT_URL = "http://localhost:4433";
const USER_URL = "http://localhost:8090";

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

export const eventApi = createApi(EVENT_URL);
export const userApi = createApi(USER_URL);
