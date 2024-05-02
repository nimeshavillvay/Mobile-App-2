import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { type ComponentProps } from "react";
import SignInLink from "./signin-link";
import UserProfileButton from "./user-profile-button";

type UserProfileProps = {
  type: ComponentProps<typeof UserProfileButton>["type"];
};

const UserProfile = ({ type }: UserProfileProps) => {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionCookie?.value) {
    return <SignInLink type={type} />;
  }

  return <UserProfileButton token={sessionCookie.value} type={type} />;
};

export default UserProfile;
