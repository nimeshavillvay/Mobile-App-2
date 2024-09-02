"use client";
import AuthenticationToggle from "@/_components/molecules/auth/auth-toggle";
import RegisterQuestion from "@/_components/molecules/auth/register-question";
import { useState } from "react";
import CurrentUserFlow from "./current-user-flow";
import NewUserFlow from "./new-user-flow";

const IS_CURRENT_USER = ["Yes", "No"] as const;
const NEW_USER_TYPES = ["Homeowner", "Buying for business"] as const;

const Register = () => {
  const [isCurrentUser, setIsCurrentUser] = useState<string>();
  const [newUserType, setNewUserType] = useState<string>();

  const handleIsCurrentUserChange = (value: string) => {
    setIsCurrentUser(value);
    setNewUserType(undefined); // Reset newUserType when isCurrentUser changes
  };

  return (
    <div
      className="container max-w-[41.5rem] space-y-5 pb-14 pt-4 md:mt-6"
      data-testid="register"
    >
      <h1 className="font-title text-2xl font-medium tracking-[-0.144px] md:text-center md:text-5xl md:leading-[3.5rem] md:tracking-[-0.576px]">
        Create an account
      </h1>
      <div className="flex flex-col gap-6">
        <RegisterQuestion
          question="Are you a current Würth Baer Supply Company customer?"
          options={IS_CURRENT_USER}
          selectedOption={isCurrentUser}
          onOptionSelect={handleIsCurrentUserChange}
        />
        {newUserType === undefined && <AuthenticationToggle mode="register" />}

        {isCurrentUser === "Yes" && <CurrentUserFlow />}

        {isCurrentUser === "No" && (
          <RegisterQuestion
            question="Please select your account type"
            options={NEW_USER_TYPES}
            selectedOption={newUserType}
            onOptionSelect={setNewUserType}
          />
        )}
        {newUserType != undefined && <NewUserFlow userType={newUserType} />}
      </div>
    </div>
  );
};

export default Register;
