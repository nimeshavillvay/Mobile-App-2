import { getShippingMethods } from "@/_lib/apis/server";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { type ComponentProps } from "react";
import UserProfileButton from "./user-profile-button";
import { UserProfileSkeleton } from "./user-profile-skeleton";

type UserProfileProps = {
  readonly type: ComponentProps<typeof UserProfileButton>["type"];
};

const UserProfile = async ({ type }: UserProfileProps) => {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_TOKEN_COOKIE);

  const shippingMethods = await getShippingMethods();

  if (!sessionCookie?.value) {
    return <UserProfileSkeleton type={type} />;
  }

  return (
    <UserProfileButton
      token={sessionCookie.value}
      type={type}
      shippingMethods={shippingMethods}
    />
  );
};

export default UserProfile;
