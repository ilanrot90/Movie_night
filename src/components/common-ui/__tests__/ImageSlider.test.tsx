import React from 'react';
import snapshotDiff from 'snapshot-diff';
import { renderUi, waitFor, screen } from 'testingUtils/utils';
import ImageSlider from '../ImageSlider';

const slides = ['slide-image-1', 'slide-image-2', 'slide-image-3'];

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
		waitFor(() => unmount());
		waitFor(() => jest.runOnlyPendingTimers());
		/*
		 * 2 calls for html non-valid attribute, 1 call for not wrapped in act
		 * */
		expect(mockedConsoleError).toHaveBeenCalledTimes(3);
	});
});
