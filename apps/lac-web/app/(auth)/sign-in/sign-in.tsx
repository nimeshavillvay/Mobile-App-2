"use client";

import useCheckEmailMutation from "@/_hooks/user/use-check-email-mutation.hook";
import type { PasswordPolicies } from "@/_lib/types";
import { cn, isErrorResponse } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useMemo } from "react";
import { useForm } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import { z } from "zod";
import { EMAIL_COOKIE } from "../constants";
import useSignInCookies from "../use-sign-in-cookies.hook";
import { login } from "./actions";

const emailFormSchema = z.object({
  email: z.string().email(),
});
const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type SignInProps = {
  passwordPolicies: PasswordPolicies;
};

const SignIn = ({ passwordPolicies }: SignInProps) => {
  const id = useId();
  const emailId = `email-${id}`;
  const passwordId = `password-${id}`;

  const router = useRouter();

  const [cookies, setCookies] = useSignInCookies();

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    values: {
      email: cookies[EMAIL_COOKIE],
    },
    resolver: zodResolver(emailFormSchema),
  });
  const checkEmailMutation = useCheckEmailMutation();

  const onSubmitEmail = emailForm.handleSubmit((data) => {
    checkEmailMutation.mutate(data.email, {
      onSuccess: (data, email) => {
        if (data.statusCode === "OK") {
          setCookies(EMAIL_COOKIE, email, {
            path: "/",
          });
          router.replace("/registration");
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
            setCookies(EMAIL_COOKIE, email, {
              path: "/",
            });
          }
        }
      },
    });
  });

  const refinedLoginFormSchema = useMemo(
    () =>
      loginFormSchema
        .extend({
          password: z.string().min(passwordPolicies.minimumLength),
        })
        .superRefine(({ password }, checkPassComplexity) => {
          const containsAlphabet = (ch: string) => /[a-z,A-Z]/.test(ch);
          const containsNumber = (ch: string) => /[0-9]/.test(ch);

          let countOfAlphabets = 0;
          let countOfNumbers = 0;

          for (const ch of password) {
            if (containsAlphabet(ch)) {
              countOfAlphabets++;
            } else if (containsNumber(ch)) {
              countOfNumbers++;
            }
          }

          // TODO Add better messaging
          if (
            countOfAlphabets < passwordPolicies.minimumAlphabets ||
            countOfNumbers < passwordPolicies.minimumNumbers
          ) {
            checkPassComplexity.addIssue({
              path: ["password"],
              code: "custom",
              message: "Password does not meet complexity requirements",
            });
          }
        }),
    [passwordPolicies],
  );
  const loginForm = useForm<z.infer<typeof refinedLoginFormSchema>>({
    values: {
      email: cookies[EMAIL_COOKIE],
      password: "",
    },
    resolver: zodResolver(refinedLoginFormSchema),
  });

  const clearEmail = () => {
    setCookies(EMAIL_COOKIE, "", { path: "/" });
  };

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      loginForm.setError("password", {
        type: "custom",
        message: data.error,
      });
    },
  });
  const onSubmitLogin = loginForm.handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  if (!cookies.email) {
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
          <h2 className="text-lg">{cookies.email}</h2>

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
              disabled={loginMutation.isPending}
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
              disabled={loginMutation.isPending}
            >
              Sign in
            </Button>

            <Link
              href="/forgot-password"
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
