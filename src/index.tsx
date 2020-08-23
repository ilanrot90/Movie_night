import ReactDOM from 'react-dom';
import React, { ReactElement } from 'react';
import { RecoilRoot, useRecoilTransactionObserver_UNSTABLE } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'normalize.css';
import ThemeProvider from 'style/ThemeProvider';

function PersistenceObserver() {
	// handle persistence here
	useRecoilTransactionObserver_UNSTABLE((/*{snapshot}*/) => null);
	return null;
}

interface IProps {
	children: ReactElement;
}

const Root = ({ children }: IProps) => {
	return (
		<RecoilRoot>
			<ThemeProvider>
				<BrowserRouter children={children} />
			</ThemeProvider>
			<PersistenceObserver />
		</RecoilRoot>
	);
};

const root = document.getElementById('root') as HTMLElement;
ReactDOM.unstable_createRoot(root).render(
	<Root>
		<App />
	</Root>
);
