import type { ResponseAddress } from "@/(auth)/register/_components/types";

export type Industry = {
  code: string;
  name: string;
};

export type UpdateAddressParams = {
  billing?: ResponseAddress;
  shipping?: ResponseAddress;
};
