const path = require('path');

module.exports = {
	displayName: {
		name: 'MOVIE-NIGHT',
		color: 'blue',
	},
	preset: 'ts-jest',
	collectCoverage: true,
	setupTestFrameworkScriptFile: './__mocks__/firebase',
	collectCoverageFrom: ['**/src/**/*.{js,ts,tsx}', '!**/node_modules/**', '!**/src/testingUtils/**'],
	verbose: true,
	notify: true,
	notifyMode: 'failure',
	testMatch: ['**/src/__tests__/*.{js,ts,tsx}', '**/*test*.{js,ts,tsx}'],
	watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
	setupFilesAfterEnv: [path.resolve(__dirname, 'src/setupTests.ts')],
	snapshotSerializers: ['jest-styled-components/serializer'],
};
