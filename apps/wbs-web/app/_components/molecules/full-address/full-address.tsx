import type { ResponseAddress } from "@/(auth)/register/_components/types";

type FullAddressProps = {
  readonly address: ResponseAddress;
};

const FullAddress = ({ address }: FullAddressProps) => {
  return (
    <div
      className="flex-1 whitespace-normal text-wrap text-left text-base font-medium text-wurth-gray-800"
      data-testid="full-address"
    >
      {address["street-address"]}, <strong>{address.locality}</strong>,{" "}
      {address.region} {address.county ? `, ${address.county} ` : null}
      {address["postal-code"]}
      {address.zip4?.length > 0 && `-${address.zip4}`}
    </div>
  );
};

export default FullAddress;
