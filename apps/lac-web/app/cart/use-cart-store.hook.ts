import { create } from "zustand";

type CartState = {
  excludedSkus: string[];
  actions: {
    setExcludedSkus: (skus: string[]) => void;
  };
};

const useCartStore = create<CartState>()((set) => ({
  excludedSkus: [],
  actions: {
    setExcludedSkus: (skus) =>
      set({
        excludedSkus: skus,
      }),
  },
}));

export default useCartStore;
