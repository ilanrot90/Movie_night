import React, { ElementType } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';
import { LOGIN_PATH, MOVIES_PATH } from './routesPaths';
import Movies from 'screens/MoviesScreen/MoviesLibrary';
import Login from 'screens/LoginScreen/Login';
import PrivateRoute from './ProtectedRoute';

interface IRoute {
	path: string;
	component: ElementType;
	children?: Array<IRoute>;
	isProtected?: boolean;
}

const routes: Array<IRoute> = [
	{ path: LOGIN_PATH, component: Login },
	{ path: MOVIES_PATH, component: Movies, isProtected: true },
	{ path: '/', component: () => <Navigate to={MOVIES_PATH} /> },
	// TODO: fix 404 page
	{ path: '*', component: () => <div>404</div> },
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
