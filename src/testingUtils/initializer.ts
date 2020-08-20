import axiosInstance from 'axiosRequest';
import MocksManager from './mocks/axiosMock';
import { setupIntersectionObserverMock, restoreIntersectionObserverMock } from './mocks/IntersectionObserver';

const originalError = console.error;

beforeAll(() => {
	setupIntersectionObserverMock();
	MocksManager.initialize(axiosInstance);
	console.error = (...args: Array<any>) => {
		if (/Warning.*not wrapped in act/.test(args[0])) {
			return;
		}
		originalError.call(console, ...args);
	};
});

beforeEach(() => {
	MocksManager.reset();
});

afterEach(async () => {
	await MocksManager.validate();
});

afterAll(() => {
	console.error = originalError;
	restoreIntersectionObserverMock();
});
