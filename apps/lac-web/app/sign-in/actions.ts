"use server";

import { api } from "@/_lib/api";
import { isErrorResponse } from "@/_lib/utils";
import { HTTPError } from "ky";
import { redirect } from "next/navigation";

export const login = async (email: string, password: string) => {
  try {
    await api
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
        };
      }>();
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

  // Redirect after successful login
  redirect("/");
};
