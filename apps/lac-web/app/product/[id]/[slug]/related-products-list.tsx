import ProductCard from "@/_components/product-card";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import type { RelatedProduct } from "./types";

type RelatedProductsListProps = {
  products: RelatedProduct[];
};

const RelatedProductsList = ({ products }: RelatedProductsListProps) => {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionToken?.value) {
    return null;
  }

  return products.map((item) => (
    <ProductCard
      key={item.productid}
      product={{
        groupName: item.item_name,
        groupImage: item.img,
        variants: [
          {
            id: item.productid,
            image: item.img,
            sku: item.txt_wurth_lac_item,
            slug: item.url,
            title: item.item_name,
            uom: item.txt_uom,
            isFavourite: item.is_favourite,
            favoriteIds: item.favoriteIds,
          },
        ],
      }}
      token={sessionToken.value}
    />
  ));
};

export default RelatedProductsList;
