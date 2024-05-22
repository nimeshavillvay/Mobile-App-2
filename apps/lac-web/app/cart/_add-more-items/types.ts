export type SearchResults = {
  summary: ProductsSummary;
  results: Result[];
};

export type Result = {
  _index: string;
  _id: string;
  _score: number;
  _source: Source;
};

export type Source = {
  dateTime: Date;
  orderQuantitybyIncrements: number;
  minimumOrderQuantity: number;
  prop65CarcenogenChemical: number;
  vendorId: number;
  description: string;
  boxQuantity: number;
  categoryName: string;
  unitWeightLable: string;
  weightValue: string;
  txtPimItem: string;
  uom: string;
  webDirect: string;
  ref: string;
  materialNumber: string;
  txt_sap_change_date: string;
  item_images: string;
  brand: number;
  sapId: number;
  brandName: string;
  SellingBookSequenceNo: number;
  descriptionName: string;
  materialType: string;
  hazardous: string;
  weight: number;
  groups: number;
  categoryCode: string;
  webVisibleStatus: string;
  prop65Message: string;
  productTitle: string;
  originalProductTitle: string;
  "@timestamp": Date;
  materialGroup: string;
  metaTitle: string;
  prop65Birth: number;
  attributes: Attribute[];
  MFRPartNo: string;
  pim_id: number;
  UPCCode: string;
  alwaysOveride: number;
  createDate: string;
  directflag: string;
  hazardousIndicator: string;
  id: string;
  prop65Wood: number;
  speicalShipping: string;
  unitWeight: string;
  upc1: string;
  xPantMatStatus: string;
  cat_path: string;
  categoryVisibleStatus: number;
  allProperties: string;
  searchableFields: string;
  searchableFieldsWithCategory: string;
};

export type Attribute = {
  name: string;
  value: string;
};

export type ProductsSummary = {
  plp: boolean;
  total: number;
};

export type Product = {
  sku: string;
  title: string;
  image: string;
  minimumOrderQuantity: number;
  orderQuantityByIncrements: number;
};
