import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { checkEmail } from "~/apis/base/account/check-email";
import type { ApiConfig } from "~/lib/types";

const useCheckEmail = (config: ApiConfig, email: string) => {
  return useQuery({
    queryKey: ["check-email", email, config],
    queryFn: () => checkEmail(config, email),
    enabled: z.string().email().safeParse(email).success,
  });
};

export default useCheckEmail;
