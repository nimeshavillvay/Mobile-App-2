import Breadcrumbs from "@/_components/breadcrumbs";
import Separator from "@/_components/separator";
import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { getBreadcrumbs } from "@/_lib/shared-server-apis";
import { getMediaUrl } from "@/_utils/helpers";
import { notFound } from "next/navigation";
import {
  MdOutlineSimCardDownload,
  MdOutlineWarningAmber,
} from "react-icons/md";
import { getProduct } from "../apis";
import AccessoriesAndRelatedProducts from "./accessories-and-related-products/accessories-and-related-products";
import { getVariants } from "./apis";
import ProductHero from "./product-hero";
import * as ProductSections from "./product-sections";
import ProductVariations from "./product-variations";

type ProductLandingProps = {
  groupId: string;
  sku?: string;
};

const ProductLanding = async ({ groupId, sku }: ProductLandingProps) => {
  const product = await getProduct(groupId, sku);
  const [breadcrumbs, attachments] = await Promise.all([
    getBreadcrumbs(groupId, "product"),
    api
      .get(`pim/webservice/rest/landingattachment/${groupId}`, {
        searchParams: sku ? new URLSearchParams({ sku }) : undefined,
        next: { revalidate: DEFAULT_REVALIDATE },
      })
      .json<{
        group_assets_images: unknown[];
        group_assets_doc: {
          file_name: string;
          file_path: string;
        }[];
        group_assets_video: unknown[];
        group_assets_downloads: unknown[];
        cross_sell: unknown[];
      }>(),
  ]);

  // Check if SKU exists
  if (sku) {
    const variants = await getVariants(groupId, sku);

    // If none the SKUs match the one given in the pathname
    if (!variants.items.some((variant) => variant.txt_wurth_lac_item === sku)) {
      return notFound();
    }
  }

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

      <ProductSections.Root>
        <ProductSections.Headings />

        <ProductSections.Section sectionType="variations" heading="Variations">
          <ProductVariations groupId={groupId} sku={sku} />
        </ProductSections.Section>

        <ProductSections.Section
          sectionType="details"
          heading="Product Details"
        >
          <div className="flex flex-row gap-[15px]">
            <div className="flex-1">
              <h3>Description</h3>

              <div
                dangerouslySetInnerHTML={{ __html: product.group_summary }}
              />

              {!!product.selected_item?.txt_prop65_message_01 && (
                <Warning
                  message={product.selected_item.txt_prop65_message_01}
                />
              )}
              {!!product.selected_item?.txt_prop65_message_02 && (
                <Warning
                  message={product.selected_item.txt_prop65_message_02}
                />
              )}
              {!!product.selected_item?.txt_prop65_message_03 && (
                <Warning
                  message={product.selected_item.txt_prop65_message_03}
                />
              )}
            </div>

            <Separator
              orientation="vertical"
              className="bg-brand-light-gray w-px self-stretch"
            />

            <div className="w-[350px]">
              <h4>Technical Details</h4>

              <table>
                <tbody>
                  {product.selected_object_attributes.map((attribute) => (
                    <tr key={attribute.attribute_name}>
                      <td>{attribute.attribute_name.trim()}</td>
                      <td>{attribute.attribute_value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ProductSections.Section>

        <ProductSections.Section
          sectionType="accessories-and-related-products"
          heading="Accessories and Related Products"
        >
          <AccessoriesAndRelatedProducts groupId={groupId} />
        </ProductSections.Section>

        <ProductSections.Section sectionType="documents" heading="Documents">
          {attachments.group_assets_doc.length ? (
            <div className="grid grid-cols-4 gap-[30px]">
              {attachments.group_assets_doc.map((doc) => (
                <a
                  key={doc.file_path}
                  href={getMediaUrl(doc.file_path)}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex flex-row items-center gap-[10px] rounded-[5px] bg-[rgba(0,173,239,0.15)] p-2"
                >
                  <MdOutlineSimCardDownload className="text-brand-secondary text-3xl" />

                  <span>{doc.file_name}</span>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-brand-very-dark-gray">
              Documents are not available
            </div>
          )}
        </ProductSections.Section>

        <ProductSections.Section
          sectionType="faq"
          heading="Questions and Answers"
        >
          <div className="text-brand-very-dark-gray">
            Questions and Answers are not available
          </div>
        </ProductSections.Section>
      </ProductSections.Root>
    </>
  );
};

export default ProductLanding;

const Warning = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-row gap-2">
      <MdOutlineWarningAmber />

      <div>
        <span className="font-bold">Warning: </span>
        {message}
      </div>
    </div>
  );
};
