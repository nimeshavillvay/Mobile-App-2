export type FeaturedBrandItem = {
  productId: string;
  isExcludedProduct: boolean;
  productSku: string;
  productName: string;
  image: string;
  slug: string;
  isComparison: boolean;
  skuAttribute: string;
  isHazardous: boolean;
  productIdOnSap: string;
  mfrPartNo: string;
  productDescription: string;
  productSubDescription: string;
  brandCode: number;
  unitOfMeasure: string;
  boxQuantity: number;
  minimumOrderQuantity: number;
  quantityByIncrements: number;
  weight: number;
  prop65MessageOne: string;
  prop65MessageTwo: null;
  prop65MessageThree: null;
  listPrice: number;
  isSaleItem: boolean;
  isNewItem: boolean;
};

export type FeaturedBrandGroup = {
  groupId: number;
  type: string;
  groupName: string;
  slug: string;
  brandName: string;
  brandId: string;
  groupImage: string;
  complianceFlags: string;
  fClassId: null;
  metaTitle: string | undefined;
  itemSkuList: FeaturedBrandItem[];
  variationsCount: number;
};
