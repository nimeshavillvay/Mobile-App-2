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
import { Role } from "@/old/_lib/types";
import { base64Encode, encryptString } from "@/old/_utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SignedData, UpdateField, UserProfile } from "./types";
import useUpdateProfileMutation from "./use-update-profile-mutation.hook";

const USER_PERMISSIONS = [
  { label: "Admin", value: "ADMIN" },
  { label: "Buyer", value: "BUYER" },
] as const;

const USER_STATUSES = [
  { label: "Active", value: "ACTIVE" },
  { label: "Deactive", value: "DEACTIVE" },
  { label: "Pending", value: "PENDING" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Disabled", value: "DISABLED" },
] as const;

type UpdateProfileRequest = {
  signed_data: SignedData;
  update_fields: UpdateField[];
};

const updateProfileSchema = z
  .object({
    firstName: z.string().trim().min(1, "Please enter first name.").max(40),
    lastName: z.string().trim().min(1, "Please enter last name.").max(40),
    jobTitle: z.string().min(1, "Please enter job title."),
    email: z
      .string()
      .trim()
      .min(1, "Please enter email address.")
      .email("Please enter a valid email address."),
    permission: z.string().min(1, "Please enter permission type."),
    status: z.string(),
    password: z
      .string()
      .min(8, "Minimum no of characters is 8.")
      .or(z.literal("")),
    confirmPassword: z
      .string()
      .min(8, "Minimum no of characters is 8.")
      .or(z.literal("")),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

type UpdateProfileProps = {
  user: UserProfile;
  jobRoles: Role[];
  setMessage: Dispatch<SetStateAction<string>>;
  setMessageOpen: Dispatch<SetStateAction<boolean>>;
};

const ProfileUpdateForm = ({ user, jobRoles }: UpdateProfileProps) => {
  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    values: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      jobTitle: user?.role,
      email: user?.email,
      permission: user?.permission,
      status: user?.status,
      password: "",
      confirmPassword: "",
    },
  });

  const updateProfileMutation = useUpdateProfileMutation();

  const onSubmit = (values: UpdateProfileSchema) => {
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

    if (values?.password) {
      const dataObj: UpdateProfileRequest = {
        signed_data: user?.signed_data,
        update_fields: updateFields,
      };
      const base64Obj: string = base64Encode(JSON.stringify(dataObj));
      const encryptedPass: string | false = encryptString(values?.password);
      const encryptedKey: string = `${encryptedPass}:${base64Obj}`;
      const base64Key: string = base64Encode(encryptedKey);

      console.log("base64key > : ", base64Key);

      if (base64Key) {
        updateFields.push({
          field: "password",
          value: base64Key,
        });
      }
    }

    if (updateFields.length > 0) {
      // Mutate your profile update
      updateProfileMutation.mutate({
        signedData: user?.signed_data,
        updateFields: updateFields,
      });
    }
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
                      This is the first name of your profile
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
                      This is the last name of your profile
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
                      This is the job title of your profile
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
                        {...field}
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is the email address of your profile
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
                      disabled={true}
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
                      This is the permission of your profile
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
                      disabled={true}
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
                      </SelectContent>
                    </Select>

                    <FormDescription className="sr-only">
                      This is the status of your profile
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="col-span-2">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0.5">
                    <FormLabel className="font-bold">New Password</FormLabel>

                    <FormControl>
                      <Input
                        className="text-[15px] placeholder:text-brand-gray-400"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is the first name of your profile
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0.5">
                    <FormLabel className="font-bold">
                      Confirm Password
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="text-[15px] placeholder:text-brand-gray-400"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormDescription className="sr-only">
                      This is the first name of your profile
                    </FormDescription>

                    <FormMessage className="text-xs dark:text-brand-primary" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="col-span-3">
            <div className="flex justify-end">
              <Button type="submit" className="px-6">
                Update
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProfileUpdateForm;
