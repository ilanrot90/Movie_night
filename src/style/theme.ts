import { DefaultTheme, FlattenSimpleInterpolation } from "styled-components";
import { centerFlex } from "./sharedStyle";

declare module "styled-components" {
  export interface DefaultTheme {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
    utils: {
      centerFlex: FlattenSimpleInterpolation;
    };
  }
}

const theme = {
  light: {
    light: "#e7cbeb",
    main: "#e1bee7",
    dark: "#9d85a1",
    contrastText: "#000",
    utils: {
      centerFlex,
    },
  },
  dark: {
    light: "#757ce8",
    main: "#3f50b5",
    dark: "#002884",
    contrastText: "#fff",
    utils: {
      centerFlex,
    },
  },
};

export default theme;
