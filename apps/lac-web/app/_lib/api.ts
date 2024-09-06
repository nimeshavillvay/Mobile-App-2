import * as Sentry from "@sentry/nextjs";
import ky from "ky";

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_WURTH_LAC_API,
  timeout: 60000,
  retry: 0,
  headers: {
    "X-AUTH-TOKEN": process.env.NEXT_PUBLIC_WURTH_LAC_API_KEY,
  },
  hooks: {
    beforeError: [
      (error) => {
        Sentry.captureException("Ky HTTP Error", {
          tags: {
            url: error.request.url,
            method: error.request.method,
            status: error.response.status,
            headers: error.options.headers?.toString(),
            body: error.options.body?.toString(),
          },
        });

        return error;
      },
    ],
  },
});

export const searchApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_WURTH_LAC_SEARCH_API,
  timeout: 20000,
});

export const xCartSearchApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_WURTH_LAC_API,
  timeout: 60000,
  retry: 0,
  headers: {
    "X-AUTH-TOKEN": process.env.WURTH_LAC_SEARCH_DATA_AND_SITEMAP_API_KEY,
  },
});
