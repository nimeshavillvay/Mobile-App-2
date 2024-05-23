"use client";

import QuantityInputField from "@/_components/quantity-input-field";
import { Suspense, type ReactNode } from "react";
import FormContent from "./form-content";

type SuspenseFallbackProps = {
  children: ReactNode;
};

const SuspenseFallback = ({ children }: SuspenseFallbackProps) => {
  return (
    <Suspense
      fallback={
        <FormContent
          formProps={{}}
          decrementButtonProps={{ disabled: true }}
          incrementButtonProps={{ disabled: true }}
          submitButtonProps={{ disabled: true }}
        >
          <QuantityInputField disabled />
        </FormContent>
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseFallback;
