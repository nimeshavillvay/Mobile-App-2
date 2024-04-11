import "server-only";
import { api } from "../api";
import { DEFAULT_REVALIDATE } from "../constants";

export const getBreadcrumbs = async (
  id: string,
  type: "product" | "category",
) => {
  // TODO Remove try/catch block and placeholder data when real API is ready
  try {
    return await api
      .get("rest/breadcrumbs", {
        searchParams: new URLSearchParams({
          [type === "product" ? "productId" : "catId"]: id,
        }),
        next: {
          revalidate: DEFAULT_REVALIDATE,
        },
      })
      .json<
        {
          oo_id: number;
          cat_name: string;
          slug: string;
        }[]
      >();
  } catch {
    return [
      {
        oo_id: "113",
        cat_name: "Woodworking and Shop Supplies",
        slug: "woodworking-and-shop-supplies",
      },
      {
        oo_id: "183",
        cat_name: "Drawer Slides & Systems",
        slug: "drawer-slides-and-systems",
      },
      {
        oo_id: "184",
        cat_name: "Drawer Slides",
        slug: "drawer-slides-c-696",
      },
      {
        oo_id: "185",
        cat_name: "Ball Bearing Slides",
        slug: "ball-bearing-slides",
      },
    ];
  }
};

type Banner = {
  "banner-id": string;
  priority: string;
  banners: {
    id: string;
    slot: string;
    class: string;
    "data-descr": string;
    active: number;
    alt_tag: string;
    priority: string;
    html_content: string;
    pdf_file_name: string;
    pdf_file_path: string;
    use_custom_link: number;
    custom_url: string;
    file_name: string;
    file_path: null | string;
    mobile_file_name: string;
    mobile_file_path: null | string;
  }[];
};
export const getBanners = async (categoryId: string) => {
  // TODO Remove try/catch block and placeholder data when real API is ready
  try {
    return await api
      .get("rest/banners", {
        searchParams: {
          categoryid: categoryId,
        },
        next: {
          revalidate: DEFAULT_REVALIDATE,
        },
      })
      .json<{
        B: Banner[];
        H: Banner[];
        T: Banner[];
      }>();
  } catch {
    return {
      B: [
        {
          "banner-id": "4",
          priority: "0",
          banners: [
            {
              id: "161",
              slot: "mainSlot",
              class: "",
              "data-descr": "",
              active: 1,
              alt_tag: "SAM Approved",
              priority: "10",
              html_content: "",
              pdf_file_name: "",
              pdf_file_path: "",
              use_custom_link: 1,
              custom_url: "/sam-gov/",
              file_name: "default_image.gif",
              file_path: "https://wurthlac.local/default_image.gif",
              mobile_file_name: "default_image.gif",
              mobile_file_path: "/default_image.gif",
            },
          ],
        },
      ],
      H: [
        {
          "banner-id": "7",
          priority: "0",
          banners: [
            {
              id: "35",
              slot: "mainSlot",
              class: "",
              "data-descr": "",
              active: 1,
              alt_tag: "",
              priority: "0",
              html_content: "werwerwerwe",
              pdf_file_name: "",
              pdf_file_path: "",
              use_custom_link: 0,
              custom_url: "",
              file_name: "",
              file_path: null,
              mobile_file_name: "",
              mobile_file_path: null,
            },
          ],
        },
      ],
      T: [
        {
          "banner-id": "2",
          priority: "1",
          banners: [
            {
              id: "162",
              slot: "mainSlot",
              class: "test-class",
              "data-descr": "this is for GTM",
              active: 1,
              alt_tag: "",
              priority: "10",
              html_content: "",
              pdf_file_name: "",
              pdf_file_path: "",
              use_custom_link: 0,
              custom_url: "",
              file_name: "default_image.gif",
              file_path: "https://wurthlac.local/default_image.gif",
              mobile_file_name: "default_image.gif",
              mobile_file_path: "/default_image.gif",
            },
            {
              id: "34",
              slot: "mainSlot",
              class: "",
              "data-descr": "",
              active: 1,
              alt_tag: "",
              priority: "30",
              html_content:
                '<div style="text-align: center;width: 100%;">\r\n<picture class="promo_free_shipping">\r\n<source srcset="https://www.wurthmachinery.com/images/A/July-2023-Free-Shipping-2.webp" type="image/webp">\r\n<source srcset="https://www.wurthmachinery.com/images/A/July-2023-Free-Shipping-2.jp2" type="image/jp2">\r\n<img src="https://www.wurthmachinery.com/images/A/July-2023-Free-Shipping-2.jpg" alt="" usemap="#freeShipMap"> \r\n <map name="freeShipMap">\r\n <area shape="rect" coords="506,167,722,372" href="https://www.wurthmachinery.com/JET-TOOLS/" class="banner-promo" data-promo-slider="Free Shipping" data-promo-offer="Free Shipping" data-promo-brand="Jet Tools" alt="Free Shipping on Jet Tools!">\r\n <area shape="rect" coords="754,168,1145,320" href="https://www.wurthmachinery.com/maksiwa-usa/" class="banner-promo" data-promo-slider="Free Shipping" data-promo-offer="Free Shipping" data-promo-brand="Maksiwa" alt="Free Shipping on Maksiwa!">\r\n <area shape="rect" coords="1190,171,1431,365" href="https://www.wurthmachinery.com/powermatic/" class="banner-promo" data-promo-slider="Free Shipping" data-promo-offer="Free Shipping" data-promo-brand="Powermatic" alt="Free Shipping on Powermatic!">\r\n <area shape="rect" coords="752,335,1166,484" href="https://www.wurthmachinery.com/powermatic/" class="banner-promo" data-promo-slider="Free Shipping" data-promo-offer="Free Shipping" data-promo-brand="Shop All Sale Brands" alt="Free Shipping Shop Now!">\r\n </map> \r\n\t</picture>\t\r\n</div>',
              pdf_file_name: "",
              pdf_file_path: "",
              use_custom_link: 0,
              custom_url: "",
              file_name: "",
              file_path: null,
              mobile_file_name: "",
              mobile_file_path: null,
            },
            {
              id: "204",
              slot: "mainSlot",
              class: "",
              "data-descr": "",
              active: 1,
              alt_tag: "New Surteco UniverSOL Edgebanding Release Agent",
              priority: "40",
              html_content: "",
              pdf_file_name: "LP1922-Surteco-promo.pdf",
              pdf_file_path:
                "/skin/common_files/documents/LP1922-Surteco-promo.pdf",
              use_custom_link: 0,
              custom_url: "",
              file_name: "default_image.gif",
              file_path: "https://wurthlac.local/default_image.gif",
              mobile_file_name: "default_image.gif",
              mobile_file_path: "/default_image.gif",
            },
            {
              id: "206",
              slot: "mainSlot",
              class: "",
              "data-descr": "",
              active: 1,
              alt_tag: "",
              priority: "50",
              html_content: "",
              pdf_file_name: "",
              pdf_file_path: "",
              use_custom_link: 0,
              custom_url: "",
              file_name: "contact_us_banner.png",
              file_path:
                "https://wurthlac.local/images/A/contact_us_banner.png",
              mobile_file_name: "banner_wurth.png",
              mobile_file_path:
                "https://wurthlac.local/images/AM/banner_wurth.png",
            },
          ],
        },
      ],
    };
  }
};

export const getFeaturedProducts = async () => {
  return await api
    .get("rest/getfeatureproducts", {
      next: { revalidate: DEFAULT_REVALIDATE },
    })
    .json<{
      bestsellers: unknown[];
      featured: unknown[];
      new: unknown[];
      on_sale: {
        productTitle: string;
        txt_description_name: string;
        txt_mfn: string;
        txt_hazardous: "Y" | "N";
        txt_web_direct: "Y" | "N";
        txt_special_shipping: string;
        groupId: number | string;
        productId: string;
        group_img: string;
        product_img: string;
        sku: string;
        txt_uom: "Pair" | "Each";
        txt_uom_label: "Pair" | "Each";
        is_sale: boolean;
        is_new: boolean;
        min_order_amount: string;
        order_qty_increments: string;
        brandId: string;
        brandName: string;
        categoryId: string;
        categoryName: string;
        subCategoryId: string;
        subCategoryName: string;
      }[];
      quick_ship: unknown[];
    }>();
};