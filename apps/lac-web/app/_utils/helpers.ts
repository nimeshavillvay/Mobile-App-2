import { clsx, type ClassValue } from "clsx";
import { JSEncrypt } from "jsencrypt";
import { twMerge } from "tailwind-merge";

/**
 * Conditionally merge Tailwind CSS classes without conflicts
 */
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const getMediaUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_WURTH_LAC_API}/pim${path}`;
};

export const encryptString = (value: string) => {
  const RSAEncrypt = new JSEncrypt();
  if (process.env.NEXT_PUBLIC_WURTH_LAC_LOGIN_PUBLIC_KEY) {
    RSAEncrypt.setPublicKey(process.env.NEXT_PUBLIC_WURTH_LAC_LOGIN_PUBLIC_KEY);
  }

  return RSAEncrypt.encrypt(value);
};
