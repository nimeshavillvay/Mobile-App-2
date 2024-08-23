import { GTM_PAGE_TYPE_OTHER } from "@/_lib/constants";
import { create } from "zustand";

type CurrentPageState = {
  pageType: string;
  actions: {
    setPageType: (pageType: string) => void;
  };
};

const useCurrentPageStore = create<CurrentPageState>()((set) => ({
  pageType: GTM_PAGE_TYPE_OTHER,
  actions: {
    setPageType: (pageType) =>
      set({
        pageType: pageType,
      }),
  },
}));

export default useCurrentPageStore;
