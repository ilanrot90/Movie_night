import React, { lazy, Suspense, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import theme from "style/theme";
import {
  useRecoilValue /*, useRecoilState, useSetRecoilState */,
} from "recoil";
import { themeKey /*themeSelector*/ } from "state/atoms/styleAtom";
import { Routes, Route } from "react-router-dom";
import { authRecoilState } from "./state/atoms/auth";
import Login from "./screens/LoginScreen/Login";
import { LOGIN_PATH } from "./routes/routesPaths";
import { useRouter } from "./hooks/useRouter";

const Application = lazy(() => import("routes/PrivateRoute"));

const App = () => {
  const { push } = useRouter();
  const themeValue = useRecoilValue(themeKey);
  const { isLoggedIn } = useRecoilValue(authRecoilState);

  useEffect(() => {
    if (!isLoggedIn) {
      push(LOGIN_PATH);
    }
  }, [isLoggedIn, push]);

  return (
    <ThemeProvider theme={theme[themeValue]}>
      <Suspense fallback={`loading...`}>
        {/* private routes */}
        {isLoggedIn ? (
          <Application />
        ) : (
          <Routes>
            {/* login routes*/}
            <Route path={LOGIN_PATH} element={<Login />} />
          </Routes>
        )}
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
