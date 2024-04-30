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

export type TransformedCategory = {
  id: number;
  name: string;
  slug: string;
  shortCode: string;
  itemCount: number;
  directItemCount: number;
  image: null | string;
  subCategory?: TransformedCategory[];
};
