import { api } from "@/_lib/api";
import type { CartItemConfiguration } from "@/_lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseCart = () => {
  return useSuspenseQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      return await api
        .get("rest/cart", {
          cache: "no-cache",
        })
        .json<{
          cartItems: {
            code: string;
            quantity: number;
            cartid: number;
            configuration: CartItemConfiguration;
            itemInfo: {
              productid: string;
              is_product_exclude: boolean;
              txt_wurth_lac_item: string;
              item_name: string;
              img: string;
              url: string;
              is_favourite: null;
              is_comparison: null;
              txt_hazardous: string;
              txt_special_shipping: string;
              txt_sap: string;
              txt_mfn: string;
              txt_description_name: string;
              txt_sub_description: string;
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
              date: Date;
              txt_chemical_carncengen: null;
              txt_chemical_reproduction: null;
              txt_contains_wood: null;
              txt_prop65_message_01: string;
              txt_prop65_message_02: null;
              txt_prop65_message_03: null;
              txt_meta_title: string;
              txt_upc1: string;
              txt_seo_meta_description: string;
              txt_keywords: string;
              list_price: string;
              on_sale: string;
              fclassid: null;
              brand_name: string;
              txt_group_code: null;
              item_status: null;
              category_name: string;
              product_summary: string;
              is_directly_shipped_from_vendor: boolean;
            };
          }[];
          configuration: {
            po_job: null;
            jobName: null;
            coupon: null;
            po: null;
            sold_to: null;
            ship_to: null;
            user_email: null;
            is_overridden: null;
            overridden_email: null;
            osr: null;
            "first-name": null;
            delivering_plant: null;
            avail_payment_options: null;
            attnName: null;
            pickDate: null;
            driverNote: null;
            orderEmail: null;
            completeDelivery: null;
            paymentToken: null;
            cardName: null;
            cardType: null;
            expireDate: null;
            paymentMethod: null;
            isAPrimaryShippingAddress: null;
            shippingAddressId: null;
          };
          "total-quantity": number;
        }>();
    },
  });
};

export default useSuspenseCart;
