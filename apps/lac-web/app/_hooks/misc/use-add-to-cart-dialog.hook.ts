import { create } from "zustand";

type AddToCartDialogState = {
  open: boolean;
  productId?: number;
  actions: {
    setOpen: (open: boolean) => void;
    setProductId: (productId?: number) => void;
  };
};

/**
 * Do not use directly. Meant to be used through the `useAddToCartMutation` hook.
 */
const useAddToCartDialog = create<AddToCartDialogState>()((set) => ({
  open: false,
  productId: undefined,
  actions: {
    setOpen: (open) =>
      set(() => {
        if (open) {
          return {
            open,
          };
        } else {
          return {
            open,
            productId: undefined, // Clear the selected product ID
          };
        }
      }),
    setProductId: (productId) => set({ productId }),
  },
}));

export default useAddToCartDialog;
