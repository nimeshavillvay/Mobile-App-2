import { API_BASE_URL, API_KEY } from "@/lib/constants";

const useApiConfig = () => {
  return {
    baseUrl: API_BASE_URL,
    apiKey: API_KEY,
  } as const;
};

export default useApiConfig;
