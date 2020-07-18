import React, { ElementType } from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { authAtom } from '../state/atoms';
import { LOGIN_PATH } from './routesPaths';

interface IProps {
	component: ElementType;
	redirectTo?: string;
}

const PrivateRoute: React.FC<IProps> = ({ redirectTo = LOGIN_PATH, component: Component, ...props }) => {
	const user = useRecoilValue(authAtom);

	if (!user) {
		return <Navigate to={`/${redirectTo}`} replace={true} />;
	}

	return <Component {...props} />;
};

export default React.memo(PrivateRoute);
