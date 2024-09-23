"use client";

import RegisterExistingUser from "@/(auth)/register/_components/register-existing-user/register-existing-user";
import RegisterNewUser from "@/(auth)/register/_components/register-new-user/register-new-user";
import type {
  Country,
  PasswordPolicies,
} from "@/(auth)/register/_components/types";
import RegisterQuestion from "@/_components/molecules/auth/register-question";
import { RecaptchaRefProvider } from "@/_context/recaptcha-ref";
import { useState } from "react";
import type { Industry } from "./types";

const IS_CURRENT_USER = ["Yes", "No"] as const;
const NEW_USER_TYPES = ["Homeowner", "Buying for business"] as const;

type RegisterProps = {
  readonly passwordPolicies: PasswordPolicies;
  readonly industries: Industry[];
  readonly countries: Country[];
};

const Register = ({
  passwordPolicies,
  industries,
  countries,
}: RegisterProps) => {
  const [isCurrentUser, setIsCurrentUser] = useState<string>();
  const [newUserType, setNewUserType] = useState<string>();

  const handleIsCurrentUserChange = (value: string) => {
    setIsCurrentUser(value);
    setNewUserType(undefined); // Reset newUserType when isCurrentUser changes
  };

  return (
    <RecaptchaRefProvider>
      <div
        className="container max-w-[41.5rem] space-y-5 pb-14 pt-4 md:mt-6"
        data-testid="register"
      >
        <h1 className="text-center font-title text-2xl font-medium tracking-[-0.144px] md:text-5xl md:leading-[3.5rem] md:tracking-[-0.576px]">
          Create an account
        </h1>
        <div className="flex flex-col gap-6">
          <RegisterQuestion
            question="Are you a current Würth Baer Supply Company customer?"
            options={IS_CURRENT_USER}
            selectedOption={isCurrentUser}
            onOptionSelect={handleIsCurrentUserChange}
          />

          {isCurrentUser === "Yes" && <RegisterExistingUser />}

          {isCurrentUser === "No" && (
            <RegisterQuestion
              question="Please select your account type"
              options={NEW_USER_TYPES}
              selectedOption={newUserType}
              onOptionSelect={setNewUserType}
              testIdPrefix="register-user-type"
            />
          )}
          {newUserType != undefined && (
            <RegisterNewUser
              passwordPolicies={passwordPolicies}
              industries={industries}
              countries={countries}
              userType={newUserType}
            />
          )}
        </div>
      </div>
    </RecaptchaRefProvider>
  );
};

export default Register;
