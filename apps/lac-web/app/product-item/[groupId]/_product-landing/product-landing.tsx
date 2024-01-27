import Breadcrumbs from "@/_components/breadcrumbs";
import { getMediaUrl } from "@/_utils/helpers";
import Image from "next/image";
import { getProduct } from "../apis";

type ProductLandingProps = {
  groupId: string;
  sku?: string;
};

const ProductLanding = async ({ groupId, sku }: ProductLandingProps) => {
  const product = await getProduct(groupId, sku);

  return (
    <>
      <Breadcrumbs
        id={groupId}
        type="product"
        currentPageTitle={product.page_title}
      />

      <div className="max-w-desktop mx-auto">
        <h1>{product.page_title}</h1>

        {!!product.group_img[0] && (
          <Image
            src={getMediaUrl(product.group_img[0])}
            alt={`A picture of ${product.page_title}`}
            width={300}
            height={300}
            className="border-brand-light-gray border object-contain"
            priority
          />
        )}
      </div>
    </>
  );
};

export default ProductLanding;
