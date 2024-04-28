"use server";

import { api } from "@/_lib/api";
import { isErrorResponse } from "@/_lib/utils";
import { HTTPError } from "ky";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { EMAIL_COOKIE } from "../constants";

export const login = async (email: string, password: string) => {
  try {
    const response = await api
      .post("rest/auth/login", {
        json: {
          userName: email,
          password,
        },
      })
      .json<{
        status_code: string;
        user_id: number;
        authentication: {
          authorities: {
            authority: string;
          }[];
          name: string;
          change_password?: boolean;
          is_sales_rep?: boolean;
        };
        change_password?: boolean;
      }>();

    const { status_code, user_id, authentication, change_password } = response;

    const authorities = authentication?.authorities;
    const authority = authorities?.[0]?.authority;

    const transformData = {
      statusCode: status_code,
      userId: user_id,
      authentication: {
        authorities: {
          authority: authority,
        },
        name: authentication?.name,
        isPasswordChanged: authentication?.change_password,
        isSalesRep: authentication?.is_sales_rep,
      },
      isPasswordChanged: change_password,
    };

    return transformData;
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 401) {
      const errorResponse = await error.response.json();

      if (
        isErrorResponse(errorResponse) &&
        errorResponse.status_code === "FAILED"
      ) {
        return {
          error: errorResponse.message,
        };
      }
    } else {
      return {
        error: "An unexpected error occurred. Please try again later.",
      };
    }
  }

  // Clear email cookie
  const cookieStore = cookies();
  cookieStore.delete(EMAIL_COOKIE);

  // Redirect after successful login
  redirect("/");
};
