"use client";

import { cn, isErrorResponse } from "@/_lib/utils/";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@repo/web-ui/components/base/molecules/password-input";

import AuthenticationToggle from "@/_components/molecules/auth/auth-toggle";
import {
  Button,
  buttonVariants,
} from "@repo/web-ui/components/base/atoms/button";
import { Input } from "@repo/web-ui/components/base/atoms/input";
import { Label } from "@repo/web-ui/components/base/atoms/label";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/web-ui/components/base/molecules/alert";
import { Alert as AlertIcon } from "@repo/web-ui/components/icons/alert";
import { HTTPError } from "ky";
import Link from "next/link";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSignInMutation from "./use-sign-in-mutation.hook";

const loginFormSchema = z.object({
  userName: z.string(),
  password: z.string(),
});

const SignIn = () => {
  const id = useId();
  const userNameId = `userName-${id}`;
  const passwordId = `password-${id}`;

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    values: {
      userName: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const signInMutation = useSignInMutation();
  const onSubmitLogin = loginForm.handleSubmit((data) => {
    signInMutation.mutate(data, {
      onError: async (error) => {
        if (error instanceof HTTPError && error.response.status === 401) {
          const errorResponse = await error.response.json();
          if (
            isErrorResponse(errorResponse) &&
            errorResponse.status_code === "FAILED"
          ) {
            loginForm.setError("password", {
              type: "custom",
              message: errorResponse.message,
            });
          }
        } else {
          loginForm.setError("password", {
            type: "custom",
            message: "Sign in unsuccessful. Please try again",
          });
        }
      },
    });
  });

  return (
    <div className="container" data-testid="sign-in">
      <div className="mx-auto my-20 max-w-[28rem] space-y-5 rounded-lg border border-wurth-gray-250 p-6 shadow-lg">
        <h1
          className="text-center font-title text-3xl font-medium tracking-[-0.225px] text-wurth-gray-800"
          data-testid="sign-in-title"
        >
          Account Sign in
        </h1>
        <p className="text-md text-center" data-testid="sign-in-description">
          Log into your account to access custom pricing, exclusive discounts,
          personalized support, and many more.
        </p>

        <form onSubmit={onSubmitLogin} className="flex flex-col gap-3">
          {!!loginForm?.formState?.errors?.password?.message && (
            <Alert variant="destructive" data-testid="alert-error">
              <AlertIcon className="size-4 stroke-red-500" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {loginForm.formState.errors.password.message}
              </AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-3">
            <Label htmlFor={userNameId} className="sr-only">
              userName
            </Label>

            <Input
              {...loginForm.register("userName")}
              id={userNameId}
              type="userName"
              autoComplete="userName"
              placeholder="User ID"
              required
              disabled={signInMutation.isPending}
              data-testid="input-username"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor={passwordId} className="sr-only">
              Password
            </Label>

            <PasswordInput
              {...loginForm.register("password")}
              id={passwordId}
              autoComplete="password"
              required
              placeholder="Password"
              disabled={signInMutation.isPending}
              data-testid="input-password"
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            <Button
              type="submit"
              className="w-full p-2.5 font-bold"
              disabled={signInMutation.isPending}
              data-testid="button-submit"
            >
              Sign in
            </Button>
            <div className="flex flex-col gap-4 xs:flex-row">
              <Link
                href={`/forgot-user-id`}
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "mx-auto inline-block h-fit p-0 text-center text-sm font-normal",
                )}
                data-testid="link-forgotUserID"
              >
                Forgot user ID?
              </Link>
              <span className="inline-block align-middle text-4xl leading-5">
                &middot;
              </span>
              <Link
                href={`/forgot-password`}
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "mx-auto inline-block h-fit p-0 text-center text-sm font-normal",
                )}
                data-testid="link-forgotPassword"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </form>
        <hr />
        <AuthenticationToggle mode="sign-in" />
      </div>
    </div>
  );
};

export default SignIn;
