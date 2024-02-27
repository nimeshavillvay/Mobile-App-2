import Breadcrumbs from "@/_components/breadcrumbs";
import Separator from "@/_components/separator";
import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { getBreadcrumbs } from "@/_lib/shared-server-apis";
import { getMediaUrl } from "@/_utils/helpers";
import { notFound } from "next/navigation";
import { MdOutlineSimCardDownload } from "react-icons/md";
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
  const [breadcrumbs, attachments, variants] = await Promise.all([
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
    getVariants(groupId, sku),
  ]);

  // Check if SKU exists
  if (sku) {
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
            <div className="flex-1 space-y-4">
              <h3 className="text-brand-gray-500 font-wurth text-[19px] font-normal leading-6">
                Description
              </h3>

              <div
                className="text-brand-gray-500"
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
              className="bg-brand-gray-400 w-px self-stretch"
            />

            <div className="w-[350px]">
              <h4 className="text-brand-gray-400 font-wurth mb-[18px] text-xl leading-6">
                Technical Details
              </h4>

              <table className="text-sm leading-5">
                <tbody>
                  {product.selected_object_attributes.map((attribute) => (
                    <tr key={attribute.attribute_name}>
                      <td className="text-brand-gray-500 pr-8 font-bold">
                        {attribute.attribute_name.trim()}
                      </td>
                      <td className="text-[#4A4A4A]">
                        {attribute.attribute_value}
                      </td>
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
                  className="bg-brand-secondary/[8%] flex flex-row items-center gap-1.5 rounded p-2.5"
                >
                  <MdOutlineSimCardDownload className="text-brand-secondary text-[32px] leading-none" />

                  <span className="text-xs leading-[18px]">
                    {doc.file_name}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-brand-gray-500">
              Documents are not available
            </div>
          )}
        </ProductSections.Section>

        <ProductSections.Section
          sectionType="faq"
          heading="Questions and Answers"
        >
          <div className="text-brand-gray-500">
            Questions and Answers are not available
          </div>
        </ProductSections.Section>
      </ProductSections.Root>

      {/* Render links to all variants for the crawler, but hide from the user */}
      <nav className="hidden">
        <ul>
          {variants.items.map((variant) => (
            <li key={`${groupId}-${variant.txt_wurth_lac_item}`}>
              <a
                href={`/product-item/${groupId}/${variant.txt_wurth_lac_item}`}
              >
                {variant.txt_description_name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default ProductLanding;

const Warning = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-row gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="34"
        height="26"
        fill="none"
        viewBox="0 0 34 26"
      >
        <path fill="url(#pattern0)" d="M0 0.775H34V25.75H0z" />
        <defs>
          <pattern
            id="pattern0"
            width="1"
            height="1"
            patternContentUnits="objectBoundingBox"
          >
            <use
              transform="matrix(.03571 0 0 .04862 0 -.035)"
              xlinkHref="#image0"
            />
          </pattern>
          <image
            id="image0"
            width="28"
            height="20"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAYAAADTlvzyAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApAAAAKQBooM8sQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIrSURBVEiJtZVNSJRRFIaf+fxpLJxGkKlQcWgzjBGoG9EEIcpFotAiUsE2bVyZtHDlbFoIzaxCWkoLEWxw6yYsBCdoo2i0EDQGkQqUBjTDUWveFp99n6Pzz8yBs7nvve/Duef+lFFY3AE8wI8C1+cVfiAOHAA3Sw0zgI+ATvM94Cgl8DmgoSHU22tBn5QK5gV+1dainR20tYWqqxHwE7hWbJgDeAdodhZJZk5OWlW+LTbwKaCeHrS0hLxe1NSE1tZQZ6cFfVgs2HUg5nKh7W00OGgBNDqK1teR04mA70BNNjMjB+BroCYUgvp6cLttweUCnw/GxwG4AbzMu5xz8QhQVxdKJMy+hUJ2hVNT5tjJCWptRUACuF8o7CrwraoKbWzYB2VuzgYuLNjjq6uoogIBUeBKIcA3gIJB21RCy8s2cHMzWRsbs7RQvrC7QKK5GR0fJ5vGYqapYaB4PFmLx5Hfj4C/QHuusMvA1/JytLKSbPg/3W5UV5daW1xEDgcCPgOVuQBfAQoEUhtKqKUFdXSk14eHra0NZIO1AX98PnR4mN5wehrNzKTX9/ZQQwMCjoBb6WCVwBfDMF+TTGZ9fai//2IPz+b8vFXlJ6AsFfAFoJGR9CZnT6lhoGg089yBAQv67DzsNnDU2Ij29zObSOb9i0Syz9vdRR4PAn5z+lk7MJ+3CNA+MQHd3dnanF+EwxAMAvABuAfwAPsHL3W2OYBLwGPAWdzaLsQBEP4H/1wXBHcwhjMAAAAASUVORK5CYII="
          />
        </defs>
      </svg>

      <div>
        <div className="float-left mr-1 font-bold text-black">Warning:</div>

        <div
          className="text-brand-gray-500 [&>a]:text-[#007BFF] [&>a]:hover:text-[#0056B3] [&>a]:hover:underline"
          dangerouslySetInnerHTML={{
            __html: message.replace(
              /(https?:\/\/)?(www\.)?[^\s]+\.[^\s]+/g,
              (matched) => {
                let withProtocol: string = matched;

                if (!withProtocol.startsWith("http")) {
                  withProtocol = "http://" + matched;
                }

                const newStr = `<a target="_blank" rel="noopener noreferrer" href="${withProtocol}">${matched}</a>`;

                return newStr;
              },
            ),
          }}
        />
      </div>
    </div>
  );
};
