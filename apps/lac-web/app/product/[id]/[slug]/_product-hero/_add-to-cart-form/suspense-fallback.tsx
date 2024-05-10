"use client";

import { Suspense, type ReactNode } from "react";
import useAddToCartForm from "../use-add-to-cart-form.hook";
import FormContent from "./form-content";

type SuspenseFallbackProps = {
  children: ReactNode;
};

const SuspenseFallback = ({ children }: SuspenseFallbackProps) => {
  const { register } = useAddToCartForm();

  return (
    <Suspense
      fallback={
        <FormContent
          formProps={{}}
          decrementButtonProps={{ disabled: true }}
          inputProps={{
            ...register("quantity", { valueAsNumber: true }),
            disabled: true,
          }}
          incrementButtonProps={{ disabled: true }}
          submitButtonProps={{ disabled: true }}
        />
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseFallback;
