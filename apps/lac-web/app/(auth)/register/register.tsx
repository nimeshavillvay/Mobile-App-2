"use client";

import { cn } from "@/_lib/utils";
import CheckCircle from "@repo/web-ui/components/icons/check-circle";
import CheckCircleFilled from "@repo/web-ui/components/icons/check-circle-filled";
import { Button } from "@repo/web-ui/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import Balancer from "react-wrap-balancer";
import { EMAIL_COOKIE } from "../constants";
import type { PasswordPolicies } from "../types";
import useSignInCookies from "../use-sign-in-cookies.hook";
import CurrentUserFlow from "./current-user-flow";

const IS_CURRENT_USER = ["Yes", "No"] as const;

type RegisterProps = {
  passwordPolicies: PasswordPolicies;
};

const Register = ({ passwordPolicies }: RegisterProps) => {
  const [, , removeCookies] = useSignInCookies();
  const [isCurrentUser, setIsCurrentUser] = useState<string>();

  return (
    <div className="container max-w-[41.5rem] space-y-5 pb-14 pt-4">
      <div className="space-y-1 text-wurth-gray-800">
        <h1 className="font-title text-2xl font-medium tracking-[-0.144px]">
          Create an Account
        </h1>

        <p className="text-sm">
          Already have a web account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold hover:underline focus:underline"
            onClick={() => removeCookies(EMAIL_COOKIE)}
          >
            Log in
          </Link>
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <section className="space-y-4 rounded-lg bg-wurth-gray-50 p-6">
          <h2 className="text-center text-base font-semibold text-black">
            <Balancer>
              Are you a current Wurth Lois & Company customer?
            </Balancer>
          </h2>

          <div className="flex flex-row gap-3">
            {IS_CURRENT_USER.map((value) => (
              <Button
                key={value}
                variant="ghost"
                className={cn(
                  "h-fit flex-1 gap-2 rounded-lg border-2 border-wurth-gray-150 bg-white p-4 font-bold text-wurth-gray-800",
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
      </div>
    </div>
  );
};

export default Register;
