import { create } from "zustand";

type UnSavedAlternativeQuantityState = {
  sku: string[];
  actions: {
    pushSku: (sku: string) => void;
    popSku: (sku: string[]) => void;
  };
};

const useUnSavedAlternativeQuantityState =
  create<UnSavedAlternativeQuantityState>()((set) => ({
    sku: [],
    actions: {
      pushSku: (sku) =>
        set((state) => ({
          sku: [...state.sku, sku],
        })),
      popSku: (skus) =>
        set((state) => {
          const newSkuArray = state.sku.filter((item) => !skus.includes(item));
          return {
            sku: newSkuArray,
          };
        }),
    },
  }));

export default useUnSavedAlternativeQuantityState;
