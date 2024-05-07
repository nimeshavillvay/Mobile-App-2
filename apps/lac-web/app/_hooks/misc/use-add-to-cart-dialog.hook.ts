import { create } from "zustand";

type DialogOpenState = "closed" | "verification" | "confirmation";

type AddToCartDialogState = {
  open: DialogOpenState;
  productId?: number;
  actions: {
    setOpen: (open: DialogOpenState) => void;
    setProductId: (productId?: number) => void;
  };
};

const useAddToCartDialog = create<AddToCartDialogState>()((set) => ({
  open: "closed",
  productId: undefined,
  actions: {
    setOpen: (open) =>
      set(() => {
        if (open !== "closed") {
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
