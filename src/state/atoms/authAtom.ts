import { atom } from "recoil";

type Auth = { name: string } | undefined;

export const authAtom = atom<Auth>({
  key: "auth",
  default: undefined,
});
