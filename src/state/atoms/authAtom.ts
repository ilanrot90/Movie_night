import { atom } from "recoil";

interface IAuth {
  isLoggedIn: boolean;
}

export const authAtom = atom<IAuth>({
  key: "auth",
  default: {
    isLoggedIn: false,
  },
});
