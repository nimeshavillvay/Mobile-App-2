import ky from "ky";

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_WURTH_LAC_API,
  timeout: 20000,
});
