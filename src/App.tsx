import React, { lazy, Suspense, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import theme from "style/theme";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { themeSelector } from "state/atoms/styleAtom";
import { Routes, Route } from "react-router-dom";
import { authAtom } from "state/atoms/authAtom";
import Login from "screens/LoginScreen/Login";
import { LOGIN_PATH } from "routes/routesPaths";
import { useRouter } from "hooks/useRouter";
import { useMount } from "hooks/useMount";
import { auth } from "./firebase/Firebase";

const Application = lazy(() => import("routes/PrivateRoute"));

const App = () => {
  const { push } = useRouter();
  const themeValue = useRecoilValue(themeSelector);
  const [user, setUser] = useRecoilState(authAtom);
  const reset = useResetRecoilState(authAtom);

  useMount(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log({ user });
        // User is signed in.
      } else {
        // No user is signed in.
        await auth.signOut();
        reset();
      }
    });
  });

  useEffect(() => {
    if (!user) {
      push(LOGIN_PATH);
    }
  }, [user, push]);

  return (
    <ThemeProvider theme={theme[themeValue]}>
      <Suspense fallback={`loading...`}>
        {/* private routes */}
        {user ? (
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
