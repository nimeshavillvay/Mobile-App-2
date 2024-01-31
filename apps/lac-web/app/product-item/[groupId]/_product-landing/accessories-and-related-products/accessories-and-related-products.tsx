import VisuallyHidden from "@/_components/visually-hidden";
import { api } from "@/_lib/api";
import { getMediaUrl } from "@/_utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

type AccessoriesAndRelatedProducts = {
  groupId: string;
};

const AccessoriesAndRelatedProducts = async ({
  groupId,
}: AccessoriesAndRelatedProducts) => {
  const products = await api
    .get(`pim/webservice/rest/landingrelatedproduct/${groupId}`)
    .json<{
      data: {
        heading: string;
        items: {
          is_product_exclude: boolean;
          group_id: number;
          item_img: string;
          item_img_zoom: {
            zoom_small: string;
            zoom_big: string;
          };
          txt_web_direct: string;
          txt_hazardous: string;
          txt_special_shipping: string;
          txt_x_pant_Mat_status: string;
          pim_item_name: string;
          sel_profile: string;
          txt_abc_code: null;
          txt_m_type: string;
          txt_reserve: null;
          txt_web_visible_status: string;
          txt_sap: string;
          txt_mfn: string;
          txt_wurth_lac_item: string;
          txt_CI_number: string;
          txt_description_name: string;
          sel_assigned_brand: string;
          item_brand_name: string;
          txt_uom: string;
          txt_uom_label: string;
          txt_uom_value: null;
          txt_rounding: null;
          txt_box_qt: string;
          txt_min_order_amount: string;
          txt_order_qty_increments: string;
          txt_weight_value: string;
          txt_wight: string;
          txt_weight_label: string;
          txt_sku_optioon_value: null;
          date: Date;
          txt_group_code: null;
          txt_mat_group: string;
          txt_mat_description_1: null;
          txt_mat_description_2: null;
          txt_print_cat_page_number: null;
          txt_sub_description: string;
          txt_product_summary: string;
          txt_chemical_carncengen: string;
          txt_chemical_reproduction: string;
          txt_contains_wood: string;
          txt_meta_title: string;
          txt_h1: string;
          txt_h2: string;
          txt_h3: string;
          txt_upc1: string;
          txt_upc2: null;
          txt_seo_meta_description: null;
          txt_keywords: string;
          override_price: string;
        }[];
      }[];
    }>();

  // No Accessories or Related Products
  if (!products.data.length) {
    return (
      <div className="text-brand-very-dark-gray">
        Accessories and Related Products are not available
      </div>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <td colSpan={3}>Item description</td>
        </tr>
      </thead>

      <tbody>
        {products.data.map((section) => (
          <Fragment key={section.heading}>
            <tr>
              <td colSpan={3}>{section.heading}</td>
            </tr>

            {section.items.map((item) => (
              <tr key={`${item.group_id}-${item.txt_wurth_lac_item}`}>
                <td>
                  <Link
                    href={`/product-item/${item.group_id}/${item.txt_wurth_lac_item}`}
                  >
                    <VisuallyHidden>
                      {item.txt_sub_description} by {item.item_brand_name}
                    </VisuallyHidden>

                    <Image
                      src={getMediaUrl(item.item_img)}
                      alt={`An image of ${item.txt_sub_description}`}
                      width={92}
                      height={92}
                      className="h-[92px] w-[92px] object-contain"
                    />
                  </Link>
                </td>

                <td>
                  <div className="uppercase">{item.item_brand_name}</div>

                  <Link
                    href={`/product-item/${item.group_id}/${item.txt_wurth_lac_item}`}
                  >
                    {item.txt_sub_description}
                  </Link>

                  <div className="flex flex-row gap-2">
                    <div>
                      Item #: <span>{item.txt_wurth_lac_item}</span>
                    </div>

                    <div>&bull;</div>

                    <div>
                      MFR Part #: <span>{item.txt_mfn}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <button className="bg-brand-primary rounded p-2 uppercase text-white">
                    Login to buy
                  </button>
                </td>
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default AccessoriesAndRelatedProducts;
