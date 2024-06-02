import ProductCard from "@/_components/product-card";
import type { RelatedProduct } from "../types";

type ProductsListProps = {
  readonly token: string;
  readonly products: RelatedProduct[];
};

const ProductsList = ({ token, products }: ProductsListProps) => {
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
            slug: item.slug,
            title: item.item_name,
            uom: item.txt_uom,
            onSale: item.on_sale === "Y",
            isNewItem: item.is_new === "Y",
          },
        ],
      }}
      token={token}
      orientation="horizontal"
    />
  ));
};

export default ProductsList;
