export type ApiConfig = {
  baseUrl: string;
  apiKey: string;
};
export type AuthenticatedApiConfig = ApiConfig & {
  token: string;
};

export type SearchApiConfig = {
  baseUrl: string;
};
