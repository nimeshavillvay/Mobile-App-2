"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";

const RecaptchaRefContext = createContext<RefObject<ReCAPTCHA> | null>(null);

export const RecaptchaRefProvider = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  return (
    <RecaptchaRefContext.Provider value={recaptchaRef}>
      {children}

      {process.env.NODE_ENV === "production" &&
        !!process.env.NEXT_PUBLIC_WURTH_LAC_RECAPTCHA_SITE_KEY && (
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_WURTH_LAC_RECAPTCHA_SITE_KEY}
          />
        )}
    </RecaptchaRefContext.Provider>
  );
};

const useRecaptchaRef = () => {
  const recaptchaRef = useContext(RecaptchaRefContext);

  if (!recaptchaRef) {
    throw new Error(
      "useRecaptchaRef must be used within a RecaptchaRefProvider",
    );
  }

  return recaptchaRef;
};

export const useCheckRecaptcha = () => {
  const recaptchaRef = useRecaptchaRef();

  const checkRecaptcha = async () => {
    if (process.env.NODE_ENV !== "production") {
      // Return a dummy token in development
      return "development-token";
    }

    const token = await recaptchaRef.current?.executeAsync();

    if (!token) {
      throw new Error("Recaptcha failed");
    }

    return token;
  };

  return checkRecaptcha;
};