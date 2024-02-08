"use server";

import {
  ACCOUNT_NO_COOKIE,
  ACCOUNT_TOKEN_COOKIE,
  ADDRESS_ID_COOKIE,
  TOKEN_COOKIE,
} from "@/_lib/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const cookieStore = cookies();

  cookieStore.delete(TOKEN_COOKIE);
  cookieStore.delete(ACCOUNT_TOKEN_COOKIE);
  cookieStore.delete(ACCOUNT_NO_COOKIE);
  cookieStore.delete(ADDRESS_ID_COOKIE);

  revalidatePath("/", "layout");
  redirect("/");
};
