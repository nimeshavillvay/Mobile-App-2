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
import VisuallyHidden from "@/old/_components/visually-hidden";
import { Role } from "@/old/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UserProfile } from "./types";

const USER_PERMISSIONS = [
  { label: "Admin", value: "ADMIN" },
  { label: "Buyer", value: "BUYER" },
] as const;

const USER_STATUSES = [
  { label: "Active", value: "ACTIVE" },
  { label: "Deactive", value: "DEACTIVE" },
];

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
};

const UserUpdateForm = ({ user, jobRoles }: UpdateUserProps) => {
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

  const onSubmit = (values: UpdateUserSchema) => {
    console.log("> values: ", values);
  };

  const renderStatusOption = (status: string) => {
    if (status === "PENDING") {
      return <SelectItem value={status}>Pending</SelectItem>;
    }
    if (status === "INACTIVE") {
      return <SelectItem value={status}>Inactive</SelectItem>;
    }
    if (status === "DISABLED") {
      return <SelectItem value={status}>Disabled</SelectItem>;
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
                        className="placeholder:text-brand-gray-400 text-[15px]"
                        {...field}
                      />
                    </FormControl>

                    <VisuallyHidden>
                      <FormDescription>
                        This is the first name for selected user
                      </FormDescription>
                    </VisuallyHidden>

                    <FormMessage className="dark:text-brand-primary text-xs" />
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
                        className="placeholder:text-brand-gray-400 text-[15px]"
                        {...field}
                      />
                    </FormControl>

                    <VisuallyHidden>
                      <FormDescription>
                        This is the last name for selected user
                      </FormDescription>
                    </VisuallyHidden>

                    <FormMessage className="dark:text-brand-primary text-xs" />
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
                        <SelectTrigger className="focus:ring-brand-gray-500 h-8 rounded-sm py-0">
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

                    <VisuallyHidden>
                      <FormDescription>
                        This is the job title for selected user
                      </FormDescription>
                    </VisuallyHidden>

                    <FormMessage className="dark:text-brand-primary text-xs" />
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
                        className="placeholder:text-brand-gray-400 text-[15px]"
                        {...field}
                      />
                    </FormControl>

                    <VisuallyHidden>
                      <FormDescription>
                        This is the email address for selected user
                      </FormDescription>
                    </VisuallyHidden>

                    <FormMessage className="dark:text-brand-primary text-xs" />
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
                        <SelectTrigger className="focus:ring-brand-gray-500 h-8 rounded-sm py-0">
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

                    <VisuallyHidden>
                      <FormDescription>
                        This is the permission for selected user
                      </FormDescription>
                    </VisuallyHidden>

                    <FormMessage className="dark:text-brand-primary text-xs" />
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
                    >
                      <FormControl>
                        <SelectTrigger className="focus:ring-brand-gray-500 h-8 rounded-sm py-0">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {USER_STATUSES.map((status) => (
                          <SelectItem value={status?.value} key={status?.value}>
                            {status?.label}
                          </SelectItem>
                        ))}
                        {renderStatusOption(user?.status)}
                      </SelectContent>
                    </Select>

                    <VisuallyHidden>
                      <FormDescription>
                        This is the status for selected user
                      </FormDescription>
                    </VisuallyHidden>

                    <FormMessage className="dark:text-brand-primary text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="col-span-3">
            <div className="flex justify-between">
              <Button className="bg-brand-secondary px-6">
                Reset User Password
              </Button>
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

export default UserUpdateForm;
