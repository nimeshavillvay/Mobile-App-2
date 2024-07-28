import { create } from "zustand";

type SessionTokenStorage = {
  token: string;
  setToken: (token: string) => void;
};

const useSessionTokenStorage = create<SessionTokenStorage>()((set) => ({
  token: "",
  setToken: (token) => set({ token }),
}));

export default useSessionTokenStorage;
