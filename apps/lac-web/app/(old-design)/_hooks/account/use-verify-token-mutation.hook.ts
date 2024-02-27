import { verifyAccountToken } from "@/old/_lib/shared-apis";
import { useMutation } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const useVerifyTokenMutation = () => {
  const [cookies] = useCookies();

  return useMutation({
    mutationFn: () => verifyAccountToken(cookies?.["account-token"]),
  });
};

export default useVerifyTokenMutation;
