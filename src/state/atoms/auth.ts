import { atom } from "recoil";

interface IAuth {
  isLoggedIn: boolean;
}

export const authRecoilState = atom<IAuth>({
  key: "auth",
  default: {
    isLoggedIn: false,
  },
});
