"use client";

import { getMediaUrl } from "@/_utils/helpers";
import Image from "next/image";
import Link from "next/link";
import useSuspenseProductList from "./use-suspense-product-list.hook";

type ProductsListProps = {
  id: string;
};

const ProductsList = ({ id }: ProductsListProps) => {
  const productsListQuery = useSuspenseProductList(id);

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {productsListQuery.data.group_list.map((product) => (
          <div
            key={product.groupId}
            className="flex flex-col items-center text-center"
          >
            <Link
              href={`/product-item/${product.groupId}`}
              className="group block"
            >
              <Image
                src={getMediaUrl(product.group_img)}
                alt={`A picture of ${product.item_group_name}`}
                width={171}
                height={171}
              />

              <div
                className="group-hover:text-brand-primary"
                dangerouslySetInnerHTML={{ __html: product.brandName }}
              />

              <div>{product.item_group_name}</div>
            </Link>

            {!!product.itemSkuList[0] && (
              <div>( {product.itemSkuList[0].txt_wurth_lac_item} )</div>
            )}

            <div>
              {product.variationsCount > 1
                ? `${product.variationsCount} variations`
                : "1 variation"}
            </div>

            <Link
              href={`/product-item/${product.groupId}`}
              className="bg-brand-primary rounded p-2 uppercase text-white"
            >
              View item
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsList;
