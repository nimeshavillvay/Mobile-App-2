import { permanentRedirect } from "next/navigation";

type OldProductPageProps = {
  params: {
    groupId: string;
    sku: string;
  };
};

const OldProductPage = ({ params: { sku } }: OldProductPageProps) => {
  // TODO Fetch the product and use its slug for the new route
  // TODO Also make sure to check if the group ID is still valid

  return permanentRedirect(`/item/${sku}/slug`);
};

export default OldProductPage;
