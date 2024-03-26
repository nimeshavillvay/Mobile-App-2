export type Attribute = {
  attribute_name: string;
  attribute_value: string;
};

export type ItemAttributes = {
  attributes: Attribute[];
  brand: string;
  weight: string;
  box_quantity: number;
  manufacturer_part: string;
};
