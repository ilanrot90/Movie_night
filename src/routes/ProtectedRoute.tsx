import React, { ElementType, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { authAtom } from '../state/atoms';
import { LOGIN_PATH, VERIFY_EMAIL } from './routesPaths';

interface IProps {
	component: ElementType;
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...props }) => {
	const user = useRecoilValue(authAtom);
	console.log({ user });
	const redirectTo = useMemo(() => (user?.verifyEmail ? `${LOGIN_PATH}/${VERIFY_EMAIL}` : !user && LOGIN_PATH), [user]);
	if (redirectTo) {
		console.log({ redirectTo });
		return <Navigate to={`/${redirectTo}`} replace={true} />;
	}

	return <Component {...props} />;
};

export default React.memo(PrivateRoute);
