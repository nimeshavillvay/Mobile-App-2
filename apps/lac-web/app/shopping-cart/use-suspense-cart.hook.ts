import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/_lib/constants";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseCart = () => {
  const [cookies] = useCookies();

  return useSuspenseQuery({
    queryKey: ["cart", cookies[ACCOUNT_TOKEN_COOKIE]],
    queryFn: () =>
      api
        .get("pim/webservice/ecommerce/cart", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
        })
        .json<{
          cartItems: {
            code: string;
            quantity: number;
            guid: number;
            configuration: {
              avail_1: string;
              avail_2: string;
              avail_3: string;
              avail_4: string;
              avail_5: string;
              plant_1: string;
              plant_2: string;
              plant_3: string;
              plant_4: string;
              plant_5: string;
              poOrJobName: string;
              shipping_method_1: string;
              shipping_method_2: string;
              shipping_method_3: string;
              shipping_method_4: string;
              shipping_method_5: string;
              will_call_avail: string;
              will_call_plant: string;
              hashvalue: string;
              selectedOption: string;
              backorder_all: string;
            };
            itemInfo: {
              groupId: number;
              txt_x_pant_Mat_status: string;
              pim_item_name: string;
              sel_profile: string;
              txt_abc_code: null;
              txt_m_type: string;
              txt_reserve: null;
              txt_web_visible_status: string;
              txt_web_direct: string;
              txt_hazardous: string;
              txt_special_shipping: string;
              txt_sap: string;
              txt_mfn: string;
              txt_wurth_CInumber: null;
              txt_wurth_lac_item: string;
              txt_description_name: string;
              sel_assigned_brand: string;
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
              txt_h1: null | string;
              txt_h2: null | string;
              txt_h3: null | string;
              txt_upc1: string;
              txt_upc2: null;
              txt_seo_meta_description: null;
              txt_keywords: null | string;
              img: string;
              brand_name: string;
              txt_prop65_message_01: string;
              txt_prop65_message_02: string;
              txt_prop65_message_03: string;
            };
          }[];
          configuration: {
            sold_to: string;
            ship_to: string;
            po_job: string;
            user_email: string;
            is_overridden: boolean;
            overridden_email: string;
            osr: string;
            "first-name": string;
            delivering_plant: string;
            avail_payment_options: string;
            po: string;
            coupon: null;
            jobName: string;
            attnName: string;
            pickDate: string;
            driverNote: null;
            orderEmail: null;
            completeDelivery: null;
            paymentToken: string;
            cardName: string;
            cardType: string;
            expireDate: string;
            paymentMethod: string;
            isAPrimaryShippingAddress: string;
            shippingAddressId: string;
          };
          "total-quantity": number;
        }>(),
  });
};

export default useSuspenseCart;
