import { api } from "@/_lib/api";
import { getMediaUrl } from "@/_utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { PAGE_SIZES, QUERY_KEYS, SORTING_TYPES } from "./constants";
import ProductsListSelectors from "./products-list-selectors";

type CategoryPageProps = {
  params: {
    id: string;
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const CategoryPage = async ({
  params: { id },
  searchParams,
}: CategoryPageProps) => {
  const page = searchParams[QUERY_KEYS.PAGE]?.toString() ?? "1";
  const pageSize =
    searchParams[QUERY_KEYS.PAGE_SIZE]?.toString() ?? PAGE_SIZES[0];
  const sorting =
    (searchParams[
      QUERY_KEYS.SORT
    ]?.toString() as (typeof SORTING_TYPES)[number]["value"]) ??
    SORTING_TYPES[0].value;

  const productsList = await api
    .get(`pim/webservice/rest/productlandinggrouplist/${id}`, {
      searchParams: new URLSearchParams({
        page,
        perpage: pageSize,
        sort: sorting,
      }),
      next: {
        revalidate: 3600,
      },
    })
    .json<{
      group_list: {
        groupId: number;
        item_group_name: string;
        slug: string;
        brandName: string;
        group_img: string;
        itemSkuList: {
          is_product_exclude: boolean;
          txt_wurth_lac_item: string;
          item_name: string;
          img: string;
          is_favourite: null;
          "SKU-attribute": string;
        }[];
        variationsCount: number;
      }[];
      pagination: [
        {
          db_count: number;
          offset: number;
          perPage: string;
        },
      ];
    }>();

  return (
    <>
      <ProductsListSelectors
        pageNo={parseInt(page)}
        pageSize={parseInt(pageSize)}
        total={productsList.pagination[0].db_count}
        sorting={sorting}
        searchParams={searchParams}
      />

      {productsList.group_list.map((product, index) => (
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
              priority={index < 4}
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
    </>
  );
};

export default CategoryPage;
