export type Category = {
  id: string;
  name: string;
  slug: string;
  shortcode: string;
  item_count: string;
  direct_item_count: string;
  img: null | string;
  subcategory?: Category[];
};
