import { useToast } from "@/(old-design)/_components/ui/use-toast";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { api } from "@/old/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { useMutation } from "@tanstack/react-query";

const useAddUserEmailMutation = () => {
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ email }: { email: string }) =>
      api
        .post("am/user-details", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: {
            email: email,
          },
        })
        .json<unknown>(),
    onSuccess: () => {},
    onError: () => {
      toast({
        description: "New user creation failed.",
        variant: "destructive",
      });
    },
    onSettled: () => {},
  });
};

export default useAddUserEmailMutation;
