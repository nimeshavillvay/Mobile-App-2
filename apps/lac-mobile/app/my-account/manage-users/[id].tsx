import useApiConfig from "@/hooks/config/use-api-config.hook";
import useAuthenticatedApiConfig from "@/hooks/config/use-authenticated-api-config.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { ConfirmationDialog } from "@repo/native-ui/components/confirmation-dialog";
import {
  FormFieldContainer,
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
import useDeleteUserMutation from "@repo/shared-logic/apis/hooks/account/use-delete-user-mutation.hook";
import useJobRoles from "@repo/shared-logic/apis/hooks/account/use-job-roles.hook";
import useResetPasswordMutation from "@repo/shared-logic/apis/hooks/account/use-reset-password-mutation.hook";
import useSuspenseUser from "@repo/shared-logic/apis/hooks/account/use-suspense-user.hook";
import useUpdateProfileMutation from "@repo/shared-logic/apis/hooks/account/use-update-profile-mutation.hook";
import { isPermission } from "@repo/shared-logic/zod-schema/misc";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import Stack from "expo-router/stack";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { Suspense, useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, View } from "react-native";
import { Button, XStack } from "tamagui";
import { z } from "zod";

const EditUserPage = () => {
  const localSearchParams = useLocalSearchParams();
  const id = localSearchParams.id?.toString();

  const authenticatedApiConfig = useAuthenticatedApiConfig();

  const deleteUserMutation = useDeleteUserMutation(authenticatedApiConfig);

  if (!id) {
    return <Redirect href="/my-account/manage-users" />;
  }

  const width = Dimensions.get("window").width;

  const deleteUser = () => {
    deleteUserMutation.mutate(Number(id), {
      onSuccess: () => {
        router.back();
      },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScreenLayout>
        <ScreenHeader
          title="Edit User"
          type="center-aligned"
          RightAction={
            <ConfirmationDialog
              title="Delete user"
              description="Are you sure you want to delete this record?"
              onConfirm={deleteUser}
            >
              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  fontSize: 17,
                  paddingHorizontal: 4,
                }}
              >
                Delete
              </Button>
            </ConfirmationDialog>
          }
        />

        <Suspense
          fallback={
            <MotiView style={{ flex: 1 }}>
              <Skeleton width={width} height="100%" colorMode="light" />
            </MotiView>
          }
        >
          <EditUserForm userId={Number(id)} />
        </Suspense>
      </ScreenLayout>
    </>
  );
};

export default EditUserPage;

const EditUserForm = ({ userId }: { readonly userId: number }) => {
  const id = useId();
  const apiConfig = useApiConfig();
  const authenticatedApiConfig = useAuthenticatedApiConfig();

  const userQuery = useSuspenseUser(authenticatedApiConfig);
  const jobRolesQuery = useJobRoles(apiConfig);

  const selectedUser = userQuery.data.manageContact.contactList.find(
    (contact) => contact.id === userId,
  );

  const formSchema = z.object({
    email: z.string().email("Please insert a valid email"),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    jobTitle: z.string(),
    permission: z.string(),
    status: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      email: selectedUser?.email ?? "",
      firstName: selectedUser?.firstName ?? "",
      lastName: selectedUser?.lastName ?? "",
      jobTitle: selectedUser?.role ?? "",
      permission: selectedUser?.permission ?? "",
      status: selectedUser?.status ?? "",
    },
  });
  const email = form.watch("email");
  const jobTitle = form.watch("jobTitle");
  const permission = form.watch("permission");
  const status = form.watch("status");

  const resetPasswordMutation = useResetPasswordMutation(apiConfig);
  const updateProfileMutation = useUpdateProfileMutation(
    authenticatedApiConfig,
  );

  const resetPassword = () => {
    resetPasswordMutation.mutate(email);
  };

  const updateProfile = form.handleSubmit((data) => {
    const permission = data.permission;

    if (selectedUser && isPermission(permission)) {
      updateProfileMutation.mutate(
        {
          userId: selectedUser.id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          jobTitle: data.jobTitle,
          permission,
          status: data.status,
        },
        {
          onSettled: (data, error, variables, context) => {
            console.log("> data: ", data);
            console.log("> error: ", error);
          },
        },
      );
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <FormRootContainer style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
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
          <Label htmlFor={`status-${id}`}>Status</Label>

          <Select
            id={`status-${id}`}
            value={status}
            onValueChange={(value) => {
              form.setValue("status", value);
              form.clearErrors("status");
            }}
          >
            <SelectTrigger placeholder="Please select" />

            <SelectAdapt />

            <SelectContent>
              <SelectItem index={0} value={"ACTIVE"}>
                <SelectItemText>Active</SelectItemText>

                <SelectItemIndicator />
              </SelectItem>

              <SelectItem index={1} value={"SUSPENDED"}>
                <SelectItemText>Deactive</SelectItemText>

                <SelectItemIndicator />
              </SelectItem>
            </SelectContent>
          </Select>

          <InputError>{form.formState.errors.permission?.message}</InputError>
        </FormFieldContainer>
      </FormRootContainer>

      <XStack
        style={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 17,
          gap: 10,
        }}
      >
        <Button
          onPress={resetPassword}
          disabled={!z.string().email().safeParse(email).success}
          style={{
            backgroundColor: "transparent",
            borderRadius: 9,
            borderColor: "#E2E2E2",
            color: "#171717",
            fontSize: 16,
            flex: 1,
            paddingHorizontal: 0,
          }}
        >
          Reset User Password
        </Button>

        <Button
          onPress={updateProfile}
          style={{
            backgroundColor: "#282828",
            borderRadius: 9,
            color: "#EDEDED",
            fontSize: 16,
            flex: 1,
            paddingHorizontal: 0,
          }}
        >
          Save Changes
        </Button>
      </XStack>
    </View>
  );
};
