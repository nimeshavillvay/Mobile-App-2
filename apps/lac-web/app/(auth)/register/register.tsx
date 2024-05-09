"use client";

import type { PasswordPolicies } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { CheckCircleFilled } from "@repo/web-ui/components/icons/check-circle-filled";
import { Button, buttonVariants } from "@repo/web-ui/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Balancer from "react-wrap-balancer";
import CurrentUserFlow from "./current-user-flow";
import NewUserFlow from "./new-user-flow";

const IS_CURRENT_USER = ["Yes", "No"] as const;

type RegisterProps = {
  passwordPolicies: PasswordPolicies;
};

const Register = ({ passwordPolicies }: RegisterProps) => {
  const [isCurrentUser, setIsCurrentUser] = useState<string>();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="container max-w-[41.5rem] space-y-5 pb-14 pt-4 md:mt-6">
      <div className="flex flex-col gap-1 text-wurth-gray-800 md:gap-5">
        <h1 className="font-title text-2xl font-medium tracking-[-0.144px] md:text-center md:text-5xl md:leading-[3.5rem] md:tracking-[-0.576px]">
          Create an Account
        </h1>

        <p className="text-sm md:hidden">
          Already have a web account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold hover:underline focus:underline"
          >
            Log in
          </Link>
        </p>

        <div className="hidden md:flex md:flex-row md:items-center md:justify-between">
          <div className="text-base text-wurth-gray-800">{email}</div>

          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "font-bold text-black",
            )}
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

          <div className="flex flex-row items-center justify-center gap-3">
            {IS_CURRENT_USER.map((value) => (
              <Button
                key={value}
                variant="ghost"
                className={cn(
                  "h-fit flex-1 gap-2 rounded-lg border-2 border-wurth-gray-150 bg-white p-4 font-bold text-wurth-gray-800 md:min-w-[7.5rem] md:flex-none",
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
