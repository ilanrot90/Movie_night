import React, { FC, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { authRecoilState } from "state/atoms/auth";
import { MOVIES_PATH } from "routes/routesPaths";
import { useRouter } from "hooks/useRouter";
import { Container } from "./style";

const LoginPage: FC = () => {
  const setAuth = useSetRecoilState(authRecoilState);
  const { replace } = useRouter();

  const handleAuth = useCallback(() => {
    setAuth({ isLoggedIn: true });
    replace(`../${MOVIES_PATH}`);
  }, [setAuth, replace]);

  return (
    <Container>
      <button onClick={handleAuth}>log in</button>
    </Container>
  );
};

export default React.memo(LoginPage);
