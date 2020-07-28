import axiosInstance from 'axiosRequest';
import MocksManager from './mocks/axiosMock';

const originalError = console.error;

beforeAll(() => {
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
});
