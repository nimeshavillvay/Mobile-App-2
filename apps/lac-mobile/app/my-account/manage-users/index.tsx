import useAuthenticatedApiConfig from "@/hooks/config/use-authenticated-api-config.hook";
import { UsersList as UserListPrimitive } from "@repo/native-ui/components/account/users-list";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import useDeleteUserMutation from "@repo/shared-logic/apis/hooks/account/use-delete-user-mutation.hook";
import useSuspenseUser from "@repo/shared-logic/apis/hooks/account/use-suspense-user.hook";
import { Link } from "expo-router";
import Stack from "expo-router/stack";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { Suspense } from "react";
import { Dimensions } from "react-native";
import { Button } from "tamagui";

const ManageUsersPage = () => {
  const width = Dimensions.get("window").width;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScreenLayout>
        <ScreenHeader
          title="Manage Users"
          type="center-aligned"
          RightAction={
            <Link href="/my-account/manage-users/add" asChild>
              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  fontSize: 17,
                  paddingHorizontal: 4,
                }}
              >
                Add User
              </Button>
            </Link>
          }
        />

        <Suspense
          fallback={
            <MotiView style={{ flex: 1 }}>
              <Skeleton width={width} height="100%" colorMode="light" />
            </MotiView>
          }
        >
          <UsersList />
        </Suspense>
      </ScreenLayout>
    </>
  );
};

export default ManageUsersPage;

const UsersList = () => {
  const authenticatedApiConfig = useAuthenticatedApiConfig();

  const userQuery = useSuspenseUser(authenticatedApiConfig);

  const deleteUserMutation = useDeleteUserMutation(authenticatedApiConfig);

  const deleteUser = async (userId: number) => {
    await deleteUserMutation.mutateAsync(userId);
  };

  return (
    <UserListPrimitive
      data={userQuery.data.manageContact.contactList}
      deleteUser={deleteUser}
    />
  );
};
