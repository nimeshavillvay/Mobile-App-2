import ky from "ky";

export const api = ky.create({
  timeout: 60000,
  retry: 0,
});
