import React, { FC, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { authRecoilState } from "state/atoms/auth";
import { MOVIES_PATH } from "routes/routesPaths";
import { useRouter } from "hooks/useRouter";

const LoginPage: FC = () => {
  const setAuth = useSetRecoilState(authRecoilState);
  const { replace } = useRouter();

  const handleAuth = useCallback(() => {
    setAuth({ isLoggedIn: true });
    replace(`../${MOVIES_PATH}`);
  }, [setAuth, replace]);

  return (
    <div>
      <button onClick={handleAuth}>log in</button>
    </div>
  );
};

export default React.memo(LoginPage);
