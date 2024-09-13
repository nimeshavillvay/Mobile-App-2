import ky from "ky";
import { API_BASE_URL, API_KEY } from "./constants";

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: 60000,
  retry: 0,
  headers: {
    "X-AUTH-TOKEN": API_KEY,
  },
});

export const searchApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_WURTH_LAC_SEARCH_API,
  timeout: 20000,
});

export const apiUserName = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_WURTH_LAC_API,
  timeout: 60000,
  retry: 0,
  headers: {
    "X-AUTH-TOKEN": process.env.NEXT_PUBLIC_WURTH_LAC_API_KEY,
  },
});
