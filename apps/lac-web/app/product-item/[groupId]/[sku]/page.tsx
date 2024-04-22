import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { notFound, permanentRedirect } from "next/navigation";

type OldProductPageProps = {
  params: {
    groupId: string;
    sku: string;
  };
};

const OldProductPage = async ({
  params: { groupId, sku },
}: OldProductPageProps) => {
  const response = await api
    .get("rest/getproductid", {
      searchParams: {
        sku,
      },
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<{
      productid: string;
      groupid: string;
      slug: string;
    }>();

  if (response.groupid !== groupId) {
    return notFound();
  }

  return permanentRedirect(`/product/${response.productid}/${response.slug}`);
};

export default OldProductPage;
