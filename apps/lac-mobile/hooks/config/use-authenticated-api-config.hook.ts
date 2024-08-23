import { API_BASE_URL, API_KEY } from "@/lib/constants";
import useSessionTokenStorage from "../auth/use-session-token-storage.hook";

const useAuthenticatedApiConfig = () => {
  const token = useSessionTokenStorage((state) => state.token);

  return {
    baseUrl: API_BASE_URL,
    apiKey: API_KEY,
    token,
  } as const;
};

export default useAuthenticatedApiConfig;
