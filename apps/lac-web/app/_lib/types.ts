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
