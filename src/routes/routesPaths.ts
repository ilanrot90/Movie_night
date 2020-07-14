import { ReactElement } from "react";

const appPrefix = "app/";

export const LOGIN_PATH = "login";
export const MOVIES_PATH = `${appPrefix}movies`;

interface IRoutes {
  path: string;
  element: ReactElement;
  children?: Array<IRoutes>;
}
