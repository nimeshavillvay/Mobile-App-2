import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { notFound, permanentRedirect } from "next/navigation";
import type { Product } from "./[slug]/apis";

type OldProductPageProps = {
  params: {
    id: string;
  };
};

const OldProductPage = async ({ params: { id } }: OldProductPageProps) => {
  const response = await api
    .get("rest/landinginfo", {
      searchParams: {
        productid: id,
      },
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<Product>();
  const { selected_item } = response;

  // Check if the id matches the product's id
  if (id === selected_item.productid.toString()) {
    return permanentRedirect(
      `/product/${selected_item.productid}/${selected_item.slug}`,
    );
  } else {
    return notFound();
  }
};

export default OldProductPage;
