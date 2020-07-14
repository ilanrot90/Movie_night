import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primaryColor: string;
    secondaryColor: string;
  }
}

const theme = {
  light: {
    primaryColor: "#333",
    secondaryColor: "#666",
  },
  dark: {
    primaryColor: "#333",
    secondaryColor: "#666",
  },
};

export default theme;
