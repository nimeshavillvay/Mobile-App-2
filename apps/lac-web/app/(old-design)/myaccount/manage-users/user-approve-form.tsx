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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdPersonAdd } from "react-icons/md";
import * as z from "zod";
import { ApproveContact, UpdateField } from "./types";
import useApprovePendingUserMutation from "./use-approve-pending-user-mutation.hook";

const USER_PERMISSIONS = [
  { label: "Admin", value: "ADMIN" },
  { label: "Buyer", value: "BUYER" },
] as const;

const approveUserSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter first name.").max(40),
  lastName: z.string().trim().min(1, "Please enter last name.").max(40),
  jobTitle: z.string(),
  email: z
    .string()
    .trim()
    .min(1, "Please enter email address.")
    .email("Please enter a valid email address."),
  permission: z.string().min(1, "Please enter permission type."),
});

type ApproveUserSchema = z.infer<typeof approveUserSchema>;

type ApproveUserProps = {
  user: ApproveContact;
  jobRoles: Role[];
};

const UserApproveForm = ({ user, jobRoles }: ApproveUserProps) => {
  const form = useForm<ApproveUserSchema>({
    resolver: zodResolver(approveUserSchema),
    values: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      jobTitle: user?.jobTitle,
      email: user?.email,
      permission: user?.permission,
    },
  });

  const approvePendingUserMutation = useApprovePendingUserMutation();

  const onSubmit = (values: ApproveUserSchema) => {
    const updateFields: UpdateField[] = [
      {
        field: "first_name",
        value: values?.firstName.trim(),
      },
      {
        field: "last_name",
        value: values?.lastName.trim(),
      },
      {
        field: "role",
        value: values?.jobTitle,
      },
      {
        field: "permission",
        value: values?.permission,
      },
    ];

    if (updateFields.length > 0) {
      // Mutate pending user approval
      approvePendingUserMutation.mutate({
        signedData: user?.signedData,
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
                        disabled={true}
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
            </div>
          </div>

          <div className="col-span-3">
            <div className="flex justify-end">
              <Button type="submit" className="px-6">
                <MdPersonAdd className="text-xl leading-none" />
                Approve
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UserApproveForm;
