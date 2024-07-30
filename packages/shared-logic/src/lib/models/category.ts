import type { Metadata } from "./shared";

/**
 * Category
 */
export type Category = {
  /**
   * The details of the category's children.
   */
  categoryChildren?: Category[] | null;
  /**
   * A unique string that identifies the category
   */
  handle: string;
  /**
   * The category's id
   */
  id?: number;
  /**
   * The image representing the category image
   */
  imageUrl?: null | string;
  /**
   * An optional key-value map with additional details
   */
  metadata?: Metadata;
  /**
   * The product category's name
   */
  name?: string;
  /**
   * The id of the parent category.
   */
  parentCategoryId: string;
  /**
   * A string for materialized paths - used for finding ancestors and descendents
   */
  path: string;
};
