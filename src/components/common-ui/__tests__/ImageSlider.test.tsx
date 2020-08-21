import React from 'react';
import snapshotDiff from 'snapshot-diff';
import { renderUi, waitFor, screen } from 'testingUtils/utils';
import ImageSlider from '../ImageSlider';

const slides = [
	'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
	'https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png',
	'https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png',
];

describe('Render image carousel component', () => {
	let mockedConsoleError: jest.SpyInstance;
	beforeAll(() => {
		mockedConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
	});

	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	afterAll(() => {
		jest.restoreAllMocks();
		jest.useRealTimers();
	});

	test('Change image after 3 sec', async () => {
		renderUi({
			app: <ImageSlider slides={slides} height={400} timeFrame={3000} />,
			route: '/',
		});
		const currentSliderImage = screen.getByTestId(/image-slider/i);

		jest.advanceTimersByTime(3001);
		const nextSliderImage = screen.getByTestId(/image-slider/i);
		// check image url was changed
		expect(snapshotDiff(currentSliderImage, nextSliderImage)).toMatchSnapshot();
	});

	test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
		const { unmount } = renderUi({
			app: <ImageSlider slides={slides} height={400} />,
			route: '/',
		});
		unmount();
		waitFor(() => jest.runOnlyPendingTimers());
		expect(mockedConsoleError).toHaveBeenCalledTimes(3);
	});
});
