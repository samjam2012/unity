import axios, { AxiosResponse } from "axios";
import { config } from "../configs/constants";
export * from "./users";
export * from "./analytics";
const EVENT_URL = config.url.EVENT_API_URL;
const USER_URL = config.url.USER_API_URL;

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
