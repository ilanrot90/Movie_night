import axiosInstance from 'axiosRequest';
import MocksManager from './mocks/axiosMock';

beforeAll(() => {
	MocksManager.initialize(axiosInstance);
});

beforeEach(() => {
	MocksManager.reset();
});

afterEach(async () => {
	await MocksManager.validate();
});

afterAll(() => {
	// destroyModalDiv();
});
