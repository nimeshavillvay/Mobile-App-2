export type Category = {
  id: number;
  name: string;
  slug: string;
  shortcode: string;
  item_count: number;
  img: null | string;
  subcategory: {
    subid: number;
    name: string;
    slug: string;
    shortcode: null;
    item_count: number;
    subsubcategory?: {
      subsubid: number;
      subsubname: string;
      slug: string;
      subsubshortcode: null;
      item_count: number;
    }[];
  }[];
};

export type Address = {
  "address-id": string;
  name: string;
  "street-address": string;
  locality: string;
  region: string;
  "postal-code": string;
  county: string;
  "country-name": string;
  plant?: string;
  route_info?: {
    route: string;
    routeName: string;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
  };
  "phone-no"?: string;
};
