export type MetadataValue =
  | string
  | number
  | boolean
  | MetadataValue[]
  | { [key: string]: MetadataValue };
/**
 * An optional key-value map with additional details
 *
 * Metadata, Flexible key-value pairs for any metadata
 */
export type Metadata = {
  [x: string]: MetadataValue;
};
