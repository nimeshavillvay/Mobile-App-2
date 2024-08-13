import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import type { Product } from "@/_lib/types";

import Image from "next/image";
import useSuspenseLaminateFilters from "../hooks/use-suspense-laminate-filters.hook";
import useSuspenseSearchLaminateList from "../hooks/use-suspense-search-laminate-list.hook";

const LaminateGroup = ({
  product,
  token,
  groupId,
}: {
  readonly product: Product;
  readonly token: string;
  readonly groupId: string;
}) => {
  const priceCheckQuery = useSuspensePriceCheck(token, [
    { productId: Number(product.variants[0]?.id), qty: 1 },
  ]);
  const groupPriceData = priceCheckQuery.data.productPrices[0];
  const groupPrice = groupPriceData?.uomPrice ?? groupPriceData?.price ?? 0; // Note: discounts are not considered for laminates

  const groupUom = groupPriceData?.uomPriceUnit ?? groupPriceData?.priceUnit;
  const categoryFiltersQuery = useSuspenseLaminateFilters({
    token,
  });
  const { data } = useSuspenseSearchLaminateList(
    token,
    categoryFiltersQuery.data,
  );
  const laminateGroupInfo = data.groupList.filter(
    (group) => group.groupId === groupId,
  )[0];
  // todo: get brand logo

  return (
    <div className="flex w-full gap-4 lg:w-60 lg:flex-col">
      <div>
        <Image
          src={laminateGroupInfo?.groupImage ?? product.groupImage}
          alt={product.groupName}
          width={44}
          height={44}
        />
        <h3
          className="mt-2 text-xl font-bold"
          dangerouslySetInnerHTML={{ __html: product.groupName }}
        />
        <p className="mb-2">
          {groupPrice}/ {groupUom}
        </p>
      </div>
      <div>
        <Image
          src={product.groupImage ?? product.variants[0]?.image}
          alt={product.groupName}
          width={240}
          height={240}
        />
      </div>
      <div className="mt-2 text-sm text-wurth-gray-500">
        <strong>Note:</strong>
        <p className="mb-2">
          Image color is for reference only. Actual colors may vary due to
          monitor settings.
        </p>
        <p>To obtain a sample, please contact your local branch.</p>
      </div>
    </div>
  );
};

export default LaminateGroup;
