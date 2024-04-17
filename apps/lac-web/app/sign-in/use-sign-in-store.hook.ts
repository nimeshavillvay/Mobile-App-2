import { create } from "zustand";

type SignInState = {
  email: string;
  actions: {
    setEmail: (email: string) => void;
  };
};

const useSignInStore = create<SignInState>()((set) => ({
  email: "",
  actions: {
    setEmail: (email) => set({ email }),
  },
}));

export default useSignInStore;
