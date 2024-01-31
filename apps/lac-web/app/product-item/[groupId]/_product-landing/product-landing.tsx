import Breadcrumbs from "@/_components/breadcrumbs";
import Separator from "@/_components/separator";
import { getBreadcrumbs } from "@/_lib/shared-api";
import { MdOutlineWarningAmber } from "react-icons/md";
import { getProduct } from "../apis";
import AccessoriesAndRelatedProducts from "./accessories-and-related-products/accessories-and-related-products";
import ProductHero from "./product-hero";
import * as ProductSections from "./product-sections";
import ProductVariations from "./product-variations";

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
          Documents
        </ProductSections.Section>

        <ProductSections.Section
          sectionType="faq"
          heading="Questions and Answers"
        >
          FAQs
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
