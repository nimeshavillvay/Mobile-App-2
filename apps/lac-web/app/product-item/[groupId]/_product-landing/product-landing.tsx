import Breadcrumbs from "@/_components/breadcrumbs";
import { getBreadcrumbs } from "@/_lib/shared-api";
import { getProduct } from "../apis";
import ProductHero from "./product-hero";

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

      <ProductHero groupId={groupId} sku={sku} />
    </>
  );
};

export default ProductLanding;
