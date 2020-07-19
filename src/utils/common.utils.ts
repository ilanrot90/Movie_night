export const isProduction = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';
export const asyncHandler = <T>(promise: Promise<T>) => {
	return promise
		.then(response => ({
			error: undefined,
			response,
		}))
		.catch(error => ({
			response: undefined,
			error,
		}));
};
