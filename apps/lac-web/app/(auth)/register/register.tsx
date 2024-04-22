"use client";

import { cn } from "@/_lib/utils";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { CheckCircleFilled } from "@repo/web-ui/components/icons/check-circle-filled";
import { Button, buttonVariants } from "@repo/web-ui/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import { EMAIL_COOKIE } from "../constants";
import type { PasswordPolicies } from "../types";
import useSignInCookies from "../use-sign-in-cookies.hook";
import CurrentUserFlow from "./current-user-flow";
import NewUserFlow from "./new-user-flow";

const IS_CURRENT_USER = ["Yes", "No"] as const;

type RegisterProps = {
  passwordPolicies: PasswordPolicies;
};

const Register = ({ passwordPolicies }: RegisterProps) => {
  const [cookies, , removeCookies] = useSignInCookies();
  const [isCurrentUser, setIsCurrentUser] = useState<string>();
  const [email, setEmail] = useState("");

  useEffect(() => {
    // TODO Find out a better way of doing this and remove the `useEffect`.
    // Using `useEffect` to sync state is a bit no-no but I couldn't
    // find a better way of preventing the hydration mismatch because
    // of the email.
    setEmail(cookies[EMAIL_COOKIE]);
  }, [cookies]);

  return (
    <div className="container max-w-[41.5rem] space-y-5 pb-14 pt-4 md:mt-6">
      <div className="gap-1 flex flex-col md:gap-5 text-wurth-gray-800">
        <h1 className="font-title text-2xl md:text-5xl md:text-center md:leading-[3.5rem] font-medium tracking-[-0.144px] md:tracking-[-0.576px]">
          Create an Account
        </h1>

        <p className="text-sm md:hidden">
          Already have a web account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold hover:underline focus:underline"
            onClick={() => removeCookies(EMAIL_COOKIE)}
          >
            Log in
          </Link>
        </p>

        <div className="hidden md:flex md:flex-row md:items-center md:justify-between">
          <div className="text-wurth-gray-800 text-base">{email}</div>

          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "font-bold text-black",
            )}
            onClick={() => removeCookies(EMAIL_COOKIE)}
          >
            Change email
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <section className="space-y-4 rounded-lg bg-wurth-gray-50 p-6">
          <h2 className="text-center text-base font-semibold text-black">
            <Balancer>
              Are you a current Wurth Lois & Company customer?
            </Balancer>
          </h2>

          <div className="flex flex-row gap-3 items-center justify-center">
            {IS_CURRENT_USER.map((value) => (
              <Button
                key={value}
                variant="ghost"
                className={cn(
                  "h-fit flex-1 md:flex-none md:min-w-[7.5rem] gap-2 rounded-lg border-2 border-wurth-gray-150 bg-white p-4 font-bold text-wurth-gray-800",
                  value === isCurrentUser && "border-black",
                )}
                onClick={() => setIsCurrentUser(value)}
              >
                {value === isCurrentUser ? (
                  <CheckCircleFilled className="size-5" />
                ) : (
                  <CheckCircle className="size-5 stroke-wurth-gray-150" />
                )}

                <span>{value}</span>
              </Button>
            ))}
          </div>
        </section>

        {isCurrentUser === "Yes" && (
          <CurrentUserFlow passwordPolicies={passwordPolicies} />
        )}

        {isCurrentUser === "No" && (
          <NewUserFlow passwordPolicies={passwordPolicies} />
        )}
      </div>
    </div>
  );
};

export default Register;
