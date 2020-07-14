import { atom, selector } from "recoil";

type themeValue = "dark" | "light";

export const themeKey = atom<themeValue>({
  key: "themeKey",
  default: "dark",
});

export const themeSelector = selector<string>({
  key: "themeSelector",
  get: ({ get }) => {
    const val = get(themeKey);
    return `value is: ${val}`;
  },
});
