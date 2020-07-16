import React, { FC, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { authAtom } from "state/atoms/authAtom";
import { MOVIES_PATH } from "routes/routesPaths";
import { useRouter } from "hooks/useRouter";
import { Container } from "./style";
import Button from "components/common-ui/Button";

const LoginPage: FC = () => {
  const setAuth = useSetRecoilState(authAtom);
  const { replace } = useRouter();

  const handleAuth = useCallback(() => {
    setAuth({ isLoggedIn: true });
    replace(`../${MOVIES_PATH}`);
  }, [setAuth, replace]);

  return (
    <Container>
      <Button onClick={handleAuth}>log in</Button>
    </Container>
  );
};

export default React.memo(LoginPage);
