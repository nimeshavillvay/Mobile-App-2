import ky from "ky";

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_WURTH_LAC_API,
  timeout: 20000,
  retry: 0,
  headers: {
    "X-AUTH-TOKEN": process.env.NEXT_PUBLIC_WURTH_LAC_API_KEY,
  },
});

export const searchApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_WURTH_LAC_SEARCH_API,
  timeout: 20000,
});
