import { api } from "@/_lib/api";
import { useToast } from "@/old/_components/ui/use-toast";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateUser } from "./types";

const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      userId,
      firstName,
      lastName,
      jobTitle,
      email,
      password,
      permission,
      status,
    }: UpdateUser) =>
      api
        .post("rest/my-account/update_profile", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: {
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
            job_title: jobTitle,
            email,
            password,
            permission,
            status,
          },
        })
        .json<{
          status_code: string;
          message: string;
        }>(),
    onMutate: () => {
      toast({ description: "Updating user profile" });
    },
    onSuccess: (data) => {
      const transformedData = {
        statusCode: data.status_code,
        message: data.message,
      };

      if (transformedData.statusCode === "OK") {
        toast({
          description: "User profile has been successfully updated.",
          variant: "success",
        });
      }
    },
    onError: () => {
      toast({
        description: "Failed to update the user profile",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "manage-users"],
      });
    },
  });
};

export default useUpdateProfileMutation;
