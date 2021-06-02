import axios, { AxiosResponse } from "axios";
import { RouteData } from "@/types/api";
import { ApiRoutes } from "./enums";

const baseURL =
  typeof process.env.VUE_APP_API_URL === "string"
    ? process.env.VUE_APP_API_URL
    : "/";

export const api = axios.create({ baseURL });

export const post = <R extends ApiRoutes>(
  route: R,
  data: RouteData[R]
): Promise<AxiosResponse<any>> => api.post(route, data);
