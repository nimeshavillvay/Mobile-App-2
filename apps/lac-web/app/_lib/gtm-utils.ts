import { GTM_PAGE_TYPE_OTHER, GTM_PAGE_TYPES } from "./constants";

export const getGTMPageType = (pathName: string) => {
  const pageType = pathName.split("/");
  switch (pageType[1]) {
    case "category": {
      return GTM_PAGE_TYPES.CATEGORY;
    }
    case "search": {
      return GTM_PAGE_TYPES.SEARCH;
    }
    case "product": {
      return GTM_PAGE_TYPES.PRODUCT;
    }
    case "catalogs-literature": {
      return GTM_PAGE_TYPES.CONTENT;
    }
    case "sign-in": {
      return GTM_PAGE_TYPES.LOGIN;
    }
    case "": {
      return GTM_PAGE_TYPES.HOME;
    }
    default: {
      return GTM_PAGE_TYPE_OTHER;
    }
  }
};
