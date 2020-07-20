import { facebookProvider, githubProvider, googleProvider } from './Firebase';

export type Provider = 'google' | 'facebook' | 'github';
export const getProvider = (provider: Provider) =>
	({
		google: googleProvider,
		facebook: facebookProvider,
		github: githubProvider,
	}[provider]);
