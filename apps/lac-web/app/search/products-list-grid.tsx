import { ProductsGridList } from "@/_components/products-grid";
import { cn, getBoolean } from "@/_lib/utils";
import { type ComponentProps } from "react";
import { getSearchResults } from "./apis";

type ProductListGridProps = {
  readonly token: string;
  readonly term: string;
  readonly type: ComponentProps<typeof ProductsGridList>["type"];
  readonly pageNo: string;
};

const ProductListGrid = async ({
  type,
  term,
  pageNo,
  token,
}: ProductListGridProps) => {
  const searchResults = await getSearchResults({
    query: term,
    pageNo,
  });

  let products: ComponentProps<typeof ProductsGridList>["products"] = [];

  if (Array.isArray(searchResults.results)) {
    products = searchResults.results.map((product) => ({
      prop: {
        groupName: product.id,
        groupImage: product.itemImage,
        variants: [
          {
            id: product.id.toString(),
            slug: product.slug,
            title: product.productTitle,
            image: product.itemImage,
            sku: product.materialNumber,
            uom: product.uom ?? "Set",
            onSale: getBoolean(product.on_sale),
            isNewItem: getBoolean(product.is_new),
          },
        ],
      },
      info: {
        groupId: product.id,
      },
    }));
  }

  return (
    <ProductsGridList
      products={products}
      type={type}
      token={token}
      className={cn(type === "desktop" && "2xl:grid-cols-6")}
    />
  );
};

export default ProductListGrid;
