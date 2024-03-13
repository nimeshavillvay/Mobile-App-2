import { Button } from "@/old/_components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/old/_components/ui/form";
import { Input } from "@/old/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import useForgetPasswordMutation from "@/old/_hooks/account/use-forget-password-mutation.hook";
import { Role } from "@/old/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import StatusOption from "./status-option";
import {
  ForgetPasswordResponse,
  Status,
  UpdateField,
  UserProfile,
} from "./types";
import useUpdateOtherUserMutation from "./use-update-other-user-mutation.hook";

const USER_PERMISSIONS = [
  { label: "Admin", value: "ADMIN" },
  { label: "Buyer", value: "BUYER" },
] as const;

const USER_STATUSES = [
  { label: "Active", value: "ACTIVE" },
  { label: "Deactive", value: "DEACTIVE" },
] as const;

const PASSWORD_RESET_INACTIVE_MSG =
  "This User is currently flagged as inactive in the system. please contact web support at websupport@wurthlac.com, or call 800-422-4389 x1014.";
const PASSWORD_RESET_PENDING_MSG =
  "An email has been sent to the User to  complete their registration. If they do not receive this email within 15 minutes, please contact web support at websupport@wurthlac.com, or call 800-422-4389 x1014.";

const updateUserSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter first name.").max(40),
  lastName: z.string().trim().min(1, "Please enter last name.").max(40),
  jobTitle: z.string(),
  email: z
    .string()
    .trim()
    .min(1, "Please enter email address.")
    .email("Please enter a valid email address."),
  permission: z.string().min(1, "Please enter permission type."),
  status: z.string(),
});

type UpdateUserSchema = z.infer<typeof updateUserSchema>;

type UpdateUserProps = {
  user: UserProfile;
  jobRoles: Role[];
  setMessage: Dispatch<SetStateAction<string>>;
  setMessageOpen: Dispatch<SetStateAction<boolean>>;
};

const UserUpdateForm = ({
  user,
  jobRoles,
  setMessage,
  setMessageOpen,
}: UpdateUserProps) => {
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    values: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      jobTitle: user?.role,
      email: user?.email,
      permission: user?.permission,
      status: user?.status,
    },
  });

  const updateOtherUserMutation = useUpdateOtherUserMutation();
  const forgetPasswordMutation = useForgetPasswordMutation();

  const onSubmit = (values: UpdateUserSchema) => {
    const updateFields: UpdateField[] = [];

    if (values?.firstName !== user?.first_name) {
      updateFields.push({
        field: "first_name",
        value: values?.firstName.trim(),
      });
    }

    if (values?.lastName !== user?.last_name) {
      updateFields.push({
        field: "last_name",
        value: values?.lastName.trim(),
      });
    }

    if (values?.jobTitle !== user?.role) {
      updateFields.push({
        field: "role",
        value: values?.jobTitle,
      });
    }

    if (values?.permission !== user?.permission) {
      updateFields.push({
        field: "permission",
        value: values?.permission,
      });
    }

    if (values?.status !== user?.status) {
      updateFields.push({
        field: "status",
        value: values?.status,
      });
    }

    if (values?.email !== user?.email) {
      updateFields.push({
        field: "email",
        value: values?.email.trim(),
      });
    }

    if (updateFields.length > 0) {
      // Mutate other user update
      updateOtherUserMutation.mutate({
        signedData: user?.signed_data,
        updateFields: updateFields,
      });
    }
  };

  const hasEditPermissions = (status: Status) => {
    if (status === "PENDING") return false;
    if (status === "INACTIVE") return false;
    return true;
  };

  const handlePasswordReset = () => {
    // Mutate user password reset
    forgetPasswordMutation.mutate(
      {
        email: user?.email,
        key: "user-management",
      },
      {
        onError: async (error) => {
          // Get data for error response body
          const response =
            (await error?.response?.json()) as ForgetPasswordResponse;

          if (response?.data?.status) {
            switch (response?.data?.status) {
              case "DEACTIVE":
                setMessage(PASSWORD_RESET_INACTIVE_MSG);
                setMessageOpen(true);
                break;
              case "PENDING":
                setMessage(PASSWORD_RESET_PENDING_MSG);
                setMessageOpen(true);
                break;
            }
          }
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
          <div className="col-span-2">
            <div className="mb-2 flex gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0.5">
                    <FormLabel className="font-bold">First Name*</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="First Name"
                        className="text-[15px] placeholder:text-brand-gray-400"
                        disabled={user?.status === "PENDING"}
                        {...field}
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is the first name for selected user
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0.5">
                    <FormLabel className="font-bold">Last Name*</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        className="text-[15px] placeholder:text-brand-gray-400"
                        disabled={user?.status === "PENDING"}
                        {...field}
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is the last name for selected user
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-4 flex gap-4">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0.5">
                    <FormLabel className="font-bold">Job Title</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!hasEditPermissions(user?.status)}
                    >
                      <FormControl>
                        <SelectTrigger className="h-8 rounded-sm py-0 focus:ring-brand-gray-500">
                          <SelectValue placeholder="Job Title" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {jobRoles.map((role) => (
                          <SelectItem key={role?.code} value={role?.code}>
                            {role?.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormDescription className="sr-only">
                      This is the job title for selected user
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0.5">
                    <FormLabel className="font-bold">Email*</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        className="text-[15px] placeholder:text-brand-gray-400"
                        disabled={!hasEditPermissions(user?.status)}
                        {...field}
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is the email address for selected user
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="permission"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0.5">
                    <FormLabel className="font-bold">Permission*</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!hasEditPermissions(user?.status)}
                    >
                      <FormControl>
                        <SelectTrigger className="h-8 rounded-sm py-0 focus:ring-brand-gray-500">
                          <SelectValue placeholder="Permission" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {USER_PERMISSIONS.map((permission) => (
                          <SelectItem
                            value={permission?.value}
                            key={permission?.value}
                          >
                            {permission?.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormDescription className="sr-only">
                      This is the permission for selected user
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0.5">
                    <FormLabel className="font-bold">Status</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!hasEditPermissions(user?.status)}
                    >
                      <FormControl>
                        <SelectTrigger className="h-8 rounded-sm py-0 focus:ring-brand-gray-500">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {USER_STATUSES.map((status) => (
                          <SelectItem value={status?.value} key={status?.value}>
                            {status?.label}
                          </SelectItem>
                        ))}
                        <StatusOption status={user?.status} />
                      </SelectContent>
                    </Select>

                    <FormDescription className="sr-only">
                      This is the status for selected user
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="col-span-3">
            <div className="flex justify-between">
              <Button
                className="bg-brand-secondary px-6"
                onClick={() => handlePasswordReset()}
              >
                Reset User Password
              </Button>
              <Button
                type="submit"
                className="px-6"
                disabled={user?.status === "PENDING"}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UserUpdateForm;
