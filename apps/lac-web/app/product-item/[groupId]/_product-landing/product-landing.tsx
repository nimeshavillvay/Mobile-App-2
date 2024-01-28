import Breadcrumbs from "@/_components/breadcrumbs";
import { getBreadcrumbs } from "@/_lib/shared-api";
import { getMediaUrl } from "@/_utils/helpers";
import Image from "next/image";
import { getProduct } from "../apis";

type ProductLandingProps = {
  groupId: string;
  sku?: string;
};

const ProductLanding = async ({ groupId, sku }: ProductLandingProps) => {
  const product = await getProduct(groupId, sku);
  const breadcrumbs = await getBreadcrumbs(groupId, "product");

  return (
    <>
      <Breadcrumbs
        links={[
          ...breadcrumbs.map((breadcrumb) => ({
            href: `/category/${breadcrumb.oo_id}/${breadcrumb.slug}`,
            label: breadcrumb.cat_name,
          })),
          {
            href: `/product-item/${groupId}${sku ? `/${sku}` : ""}`,
            label: product.page_title,
          },
        ]}
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
