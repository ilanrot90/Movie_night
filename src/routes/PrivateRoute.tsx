import React from "react";
import { useRoutes } from "react-router-dom";
import { MOVIES_PATH } from "./routesPaths";
import Movies from "screens/MoviesScreen/MoviesLibrary";

const Application = () => {
  return useRoutes([
    { path: "/", element: <Movies /> },
    { path: MOVIES_PATH, element: <Movies /> },
    { path: "*", element: 404 },
  ]);
};

export default Application;
