import React, { ElementType } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';
import { LOGIN_PATH, MOVIES_PATH, VERIFY_EMAIL, APP_PATH, SIGN_UP_PATH, RESET_PATH } from './routesPaths';
import Movies from 'screens/MoviesScreen/MoviesLibrary';
import Login from 'screens/LoginScreen/Login';
import SignUpForm from 'screens/LoginScreen/SignUpForm';
import VerifyEmail from 'screens/LoginScreen/VerifyEmail';
import ResetAccount from 'screens/LoginScreen/ResetAccount';
import LoginForm from 'screens/LoginScreen/LoginForm';
import PrivateRoute from './ProtectedRoute';
import AppLayout from 'components/Applayout';

interface IRoute {
	path: string;
	component: ElementType;
	children?: Array<IRoute>;
	isProtected?: boolean;
}

const routes: Array<IRoute> = [
	{
		path: LOGIN_PATH,
		component: Login,
		children: [
			{ path: '/', component: LoginForm },
			{ path: SIGN_UP_PATH, component: SignUpForm },
			{ path: VERIFY_EMAIL, component: VerifyEmail },
			{ path: RESET_PATH, component: ResetAccount },
		],
	},
	{
		path: `${APP_PATH}/*`,
		component: AppLayout,
		isProtected: true,
		children: [
			{ path: '/', component: Movies },
			{ path: MOVIES_PATH, component: Movies },
		],
	},
	// TODO: fix 404 page
	{ path: '*', component: () => <Navigate to={APP_PATH} /> },
];

declare function MapRoutes(routes: Array<IRoute>): Array<PartialRouteObject>;
const mapRoutes: typeof MapRoutes = routes =>
	routes.map(({ path, component: Component, children, isProtected }: IRoute) => ({
		path,
		element: isProtected ? <PrivateRoute component={Component} /> : <Component />,
		children: children && mapRoutes(children),
	}));

const ProjectRoutes = () => useRoutes(mapRoutes(routes));

export default ProjectRoutes;
