"use client";

import useCheckEmailMutation from "@/_hooks/user/use-check-email-mutation.hook";
import type { PasswordPolicies } from "@/_lib/types";
import { checkPasswordComplexity, cn, isErrorResponse } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { HTTPError } from "ky";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useId, useMemo } from "react";
import { useForm } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import { z } from "zod";
import useSignInMutation from "./use-sign-in-mutation.hook";

const emailFormSchema = z.object({
  email: z.string().email(),
});
const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignInProps = {
  passwordPolicies: PasswordPolicies;
};

const SignIn = ({ passwordPolicies }: SignInProps) => {
  const id = useId();
  const emailId = `email-${id}`;
  const passwordId = `password-${id}`;

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const router = useRouter();

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    values: {
      email: email ?? "",
    },
    resolver: zodResolver(emailFormSchema),
  });
  const checkEmailMutation = useCheckEmailMutation();

  const onSubmitEmail = emailForm.handleSubmit((data) => {
    checkEmailMutation.mutate(data.email, {
      onSuccess: (data, email) => {
        if (data.statusCode === "OK") {
          const newURLSearchParams = new URLSearchParams({
            email,
          });

          router.replace(`/register?${newURLSearchParams.toString()}`);
        }
      },
      onError: async (error, email) => {
        if (error?.response?.status === 400) {
          const errorResponse = await error.response.json();

          // The email already exists
          if (
            isErrorResponse(errorResponse) &&
            errorResponse["status_code"] === "FAILED" &&
            errorResponse.message ===
              "Email address already exists in the database."
          ) {
            const newURLSearchParams = new URLSearchParams({
              email,
            });

            router.replace(`/sign-in?${newURLSearchParams.toString()}`);
          }
        }
      },
    });
  });

  const refinedLoginFormSchema = useMemo(
    () =>
      loginFormSchema.superRefine(({ password }, context) =>
        checkPasswordComplexity({ password, passwordPolicies, context }),
      ),
    [passwordPolicies],
  );
  const loginForm = useForm<z.infer<typeof refinedLoginFormSchema>>({
    values: {
      email: email ?? "",
      password: "",
    },
    resolver: zodResolver(refinedLoginFormSchema),
  });

  const clearEmail = () => {
    router.replace("/sign-in");
  };

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
            message: "An unexpected error occurred. Please try again later.",
          });
        }
      },
    });
  });

  if (!email) {
    return (
      <div className="container">
        <form
          onSubmit={onSubmitEmail}
          className="mx-auto my-20 max-w-[25rem] space-y-4 rounded-lg border border-wurth-gray-250 p-6 shadow-lg"
        >
          <h1 className="text-center font-title text-xl font-medium tracking-[-0.1px] text-wurth-gray-800">
            <Balancer>
              Enter your email address to sign in or to create an account
            </Balancer>
          </h1>

          <Label htmlFor={emailId} className="sr-only">
            Email
          </Label>

          <Input
            {...emailForm.register("email")}
            id={emailId}
            type="email"
            required
            placeholder="someone@example.com"
            className="rounded border-wurth-gray-250 px-3 py-2 text-center text-base shadow-sm"
            disabled={checkEmailMutation.isPending}
          />

          <Button
            type="submit"
            className="w-full py-2.5 font-bold"
            disabled={checkEmailMutation.isPending}
          >
            Continue
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="mx-auto my-20 max-w-[25rem] space-y-5">
        <h1 className="text-center font-title text-3xl font-medium tracking-[-0.225px] text-wurth-gray-800">
          Welcome back!
        </h1>

        <div className="space-y-1 text-center">
          <h2 className="text-lg">{email}</h2>

          <button
            className="text-sm text-red-800 underline"
            onClick={clearEmail}
          >
            Use a different email
          </button>
        </div>

        <form onSubmit={onSubmitLogin} className="flex flex-col gap-6 p-2.5">
          <div className="sr-only">
            <Label htmlFor={emailId}>Email</Label>

            <Input
              {...loginForm.register("email")}
              id={emailId}
              type="hidden"
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor={passwordId} className="sr-only">
              Password
            </Label>

            <Input
              {...loginForm.register("password")}
              id={passwordId}
              type="password"
              required
              className="rounded border-wurth-gray-250 px-3 py-2 text-base shadow-sm"
              disabled={signInMutation.isPending}
            />

            {!!loginForm?.formState?.errors?.password?.message && (
              <p className="text-center text-sm text-wurth-gray-500">
                {loginForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button
              type="submit"
              variant="secondary"
              className="w-full p-2.5 font-bold"
              disabled={signInMutation.isPending}
            >
              Sign in
            </Button>

            <Link
              href={`/forgot-password?email=${email}`}
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "mx-auto inline-block h-fit p-0 text-center text-sm font-normal",
              )}
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
