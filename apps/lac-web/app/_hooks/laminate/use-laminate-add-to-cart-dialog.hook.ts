import { create } from "zustand";

type LaminateAddToCartDialogState = {
  open: boolean;
  groupId?: string;
  actions: {
    setOpen: (open: boolean) => void;
    setGroupId: (groupId?: string) => void;
  };
};

const useLaminateAddToCartDialog = create<LaminateAddToCartDialogState>()(
  (set) => ({
    open: false,
    groupId: undefined,
    actions: {
      setOpen: (open) => set({ open }),
      setGroupId: (groupId) => set({ groupId }),
    },
  }),
);

export default useLaminateAddToCartDialog;
