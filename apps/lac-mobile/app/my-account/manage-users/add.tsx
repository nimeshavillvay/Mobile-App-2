import useApiConfig from "@/hooks/config/use-api-config.hook";
import useAuthenticatedApiConfig from "@/hooks/config/use-authenticated-api-config.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import {
  CheckIcon,
  Checkbox,
  CheckboxIndicator,
} from "@repo/native-ui/components/form/checkbox";
import {
  FormFieldContainer,
  FormFieldHorizontalContainer,
  FormRootContainer,
} from "@repo/native-ui/components/form/container";
import { Input, InputError } from "@repo/native-ui/components/form/input";
import { Label } from "@repo/native-ui/components/form/label";
import {
  Select,
  SelectAdapt,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectTrigger,
} from "@repo/native-ui/components/form/select";
import useAddUserMutation from "@repo/shared-logic/apis/hooks/account/use-add-user-mutation.hook";
import useCheckEmail from "@repo/shared-logic/apis/hooks/account/use-check-email.hook";
import useJobRoles from "@repo/shared-logic/apis/hooks/account/use-job-roles.hook";
import useSuspensePasswordPolicy from "@repo/shared-logic/apis/hooks/account/use-suspense-password-policy.hook";
import { isPermission } from "@repo/shared-logic/zod-schema/misc";
import { router } from "expo-router";
import Stack from "expo-router/stack";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
// eslint-disable-next-line no-restricted-imports
import { Suspense, useEffect, useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, View } from "react-native";
import { Button } from "tamagui";
import { z } from "zod";

const AddUserPage = () => {
  const width = Dimensions.get("window").width;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScreenLayout>
        <ScreenHeader title="Add New User" type="center-aligned" />

        <Suspense
          fallback={
            <MotiView style={{ flex: 1 }}>
              <Skeleton width={width} height="100%" colorMode="light" />
            </MotiView>
          }
        >
          <AddUserForm />
        </Suspense>
      </ScreenLayout>
    </>
  );
};

export default AddUserPage;

const AddUserForm = () => {
  const id = useId();
  const apiConfig = useApiConfig();
  const authenticatedApiConfig = useAuthenticatedApiConfig();

  const passwordPolicyQuery = useSuspensePasswordPolicy(apiConfig);
  const jobRolesQuery = useJobRoles(apiConfig);

  const formSchema = z
    .object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      jobTitle: z.string().min(1, { message: "Select a Job Title" }),
      permission: z.string().min(1, { message: "Select the Permission" }),
      email: z.string().email(),
      password: z.string(),
      confirmPassword: z.string(),
      resetPassword: z.boolean(),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ["confirmPassword"],
        });
      }

      passwordPolicyQuery.data.data.passwordPolicies.forEach((policy) => {
        if (
          policy.code === "MIN_CHAR_LEN" &&
          password.length < Number(policy.value)
        ) {
          ctx.addIssue({
            code: "custom",
            message: "Your password must be at least 8 characters long.",
            path: ["password"],
          });
        }

        if (
          policy.code === "MIN_NUMBER" &&
          String(password).replace(/[^0-9]/g, "").length < Number(policy.value)
        ) {
          ctx.addIssue({
            code: "custom",
            message: "Password must contain at least one digit (0-9)",
            path: ["password"],
          });
        }

        if (
          policy.code === "MIN_CHAR_Cha_LEN" &&
          String(password).replace(/[^a-z]/g, "").length < Number(policy.value)
        ) {
          ctx.addIssue({
            code: "custom",
            message:
              "Password must include at least one lowercase letter (a-z).",
            path: ["password"],
          });
        }

        if (
          policy.code === "MIN_CHAR_Cha_LEN" &&
          String(password).replace(/[^A-Z]/g, "").length < Number(policy.value)
        ) {
          ctx.addIssue({
            code: "custom",
            message:
              "Password must include at least one uppercase letter (A-Z).",
            path: ["password"],
          });
        }
      });
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      permission: "",
      email: "",
      password: "",
      confirmPassword: "",
      resetPassword: true,
    },
  });
  const email = form.watch("email");
  const jobTitle = form.watch("jobTitle");
  const permission = form.watch("permission");
  const resetPassword = form.watch("resetPassword");

  const checkEmailQuery = useCheckEmail(apiConfig, email);
  const checkEmailData = checkEmailQuery.data;

  useEffect(() => {
    if (checkEmailData?.status_code === "USER_ACTIVE") {
      form.setError("email", {
        message:
          "The email address you entered is already in use. Please use a different email.",
      });
    }
  }, [checkEmailData, form]);

  const addUserMutation = useAddUserMutation(authenticatedApiConfig);

  const addUser = form.handleSubmit((data) => {
    const permission = data.permission;

    if (isPermission(permission)) {
      addUserMutation.mutate(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          jobTitle: data.jobTitle,
          permission,
          email: data.email,
          password: data.password,
          resetPassword: data.resetPassword,
        },
        {
          onSuccess: () => {
            router.back();
          },
        },
      );
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <FormRootContainer style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
        <FormFieldContainer>
          <Label htmlFor={`first-name-${id}`}>First Name</Label>

          <Controller
            control={form.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                id={`first-name-${id}`}
                placeholder="First Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstName"
          />

          <InputError>{form.formState.errors.firstName?.message}</InputError>
        </FormFieldContainer>

        <FormFieldContainer>
          <Label htmlFor={`last-name-${id}`}>Last Name</Label>

          <Controller
            control={form.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                id={`last-name-${id}`}
                placeholder="Last Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastName"
          />

          <InputError>{form.formState.errors.lastName?.message}</InputError>
        </FormFieldContainer>

        <FormFieldContainer>
          <Label htmlFor={`job-title-${id}`}>Job Title</Label>

          <Select
            id={`job-title-${id}`}
            value={jobTitle}
            onValueChange={(value) => {
              form.setValue("jobTitle", value);
              form.clearErrors("jobTitle");
            }}
          >
            <SelectTrigger placeholder="Please select" />

            <SelectAdapt />

            <SelectContent>
              {jobRolesQuery.data.roles.map((job, index) => (
                <SelectItem index={index} value={job.code} key={job.code}>
                  <SelectItemText>{job.description}</SelectItemText>

                  <SelectItemIndicator />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <InputError>{form.formState.errors.jobTitle?.message}</InputError>
        </FormFieldContainer>

        <FormFieldContainer>
          <Label htmlFor={`permission-${id}`}>Permission</Label>

          <Select
            id={`permission-${id}`}
            value={permission}
            onValueChange={(value) => {
              form.setValue("permission", value);
              form.clearErrors("permission");
            }}
          >
            <SelectTrigger placeholder="Please select" />

            <SelectAdapt />

            <SelectContent>
              <SelectItem index={0} value={"ADMIN"}>
                <SelectItemText>Administrator</SelectItemText>

                <SelectItemIndicator />
              </SelectItem>

              <SelectItem index={1} value={"BUYER"}>
                <SelectItemText>Buyer</SelectItemText>

                <SelectItemIndicator />
              </SelectItem>
            </SelectContent>
          </Select>

          <InputError>{form.formState.errors.permission?.message}</InputError>
        </FormFieldContainer>

        <FormFieldContainer>
          <Label htmlFor={`email-${id}`}>Email</Label>

          <Controller
            control={form.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                id={`email-${id}`}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />

          <InputError>{form.formState.errors.email?.message}</InputError>
        </FormFieldContainer>

        <FormFieldContainer>
          <Label htmlFor={`password-${id}`}>Password</Label>

          <Controller
            control={form.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                id={`password-${id}`}
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
            name="password"
          />

          <InputError>{form.formState.errors.password?.message}</InputError>
        </FormFieldContainer>

        <FormFieldContainer>
          <Label htmlFor={`confirm-password-${id}`}>Confirm Password</Label>

          <Controller
            control={form.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                id={`confirm-password-${id}`}
                placeholder="Confirm Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
            name="confirmPassword"
          />

          <InputError>
            {form.formState.errors.confirmPassword?.message}
          </InputError>
        </FormFieldContainer>

        <FormFieldHorizontalContainer>
          <Checkbox
            checked={resetPassword}
            onCheckedChange={(checked) =>
              form.setValue("resetPassword", checked === true)
            }
          >
            <CheckboxIndicator>
              <CheckIcon />
            </CheckboxIndicator>
          </Checkbox>

          <Label htmlFor={`reset-password-${id}`}>Force Password Reset</Label>
        </FormFieldHorizontalContainer>
      </FormRootContainer>

      <View
        style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 17 }}
      >
        <Button
          onPress={addUser}
          style={{
            backgroundColor: "#282828",
            borderRadius: 9,
            color: "#EDEDED",
            fontSize: 16,
          }}
        >
          Add User
        </Button>
      </View>
    </View>
  );
};
