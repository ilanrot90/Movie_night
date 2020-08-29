import { useState, useEffect } from 'react';
import placeholderImage from 'assets/lazy_loader.gif';

type Props = {
	src: string;
	placeholder?: string;
	options?: {
		threshold?: number | number[];
		rootMargin?: string;
	};
};
type R<T> = {
	elementRef: (instance: T | null) => void;
	imageSrc: string;
	isLoading: boolean;
};

const defaultOptions = {
	threshold: 0.01,
	rootMargin: '100%',
};

const useLazyImage = <T extends Element>({ src, placeholder = placeholderImage, options = defaultOptions }: Props): R<T> => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [imageSrc, setImageSrc] = useState<string>(placeholder);
	const [imageRef, elementRef] = useState<T>() as [T, (instance: T | null) => void];

	useEffect(() => {
		let observer: IntersectionObserver;

		if (imageRef && isLoading) {
			if (IntersectionObserver) {
				observer = new IntersectionObserver(entries => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							setImageSrc(src);
							setLoading(false);
							observer.unobserve(imageRef);
						}
					});
				}, options);
				observer.observe(imageRef);
			} else {
				setImageSrc(src);
			}
		}

		return () => {
			observer?.unobserve(imageRef);
		};
	}, [src, imageSrc, imageRef, isLoading, options]);

	return { elementRef, imageSrc, isLoading };
};

export default useLazyImage;
