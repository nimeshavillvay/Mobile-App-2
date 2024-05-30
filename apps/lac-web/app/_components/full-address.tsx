import type { Address } from "@/_lib/types";

type FullAddressProps = {
  readonly address: Address | undefined;
};

const FullAddress = ({ address }: FullAddressProps) => {
  if (!address) {
    return null;
  }

  return (
    <>
      {address?.streetAddress && `${address?.streetAddress}, `}
      {address?.locality && `${address?.locality}, `}
      {address?.region}
      {address?.county && `, ${address?.county}`}
      &nbsp;
      {address?.postalCode}
      {address?.zip4 && `-${address.zip4}`}
    </>
  );
};

export default FullAddress;
