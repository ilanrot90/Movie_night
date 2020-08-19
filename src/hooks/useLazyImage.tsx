import { useState, useEffect } from 'react';
import placeholderImage from 'assets/lazy_loader.gif';

type Props = {
	src: string;
	placeholder?: string;
};
type R<T> = {
	elementRef: (instance: T | null) => void;
	imageSrc: string;
	isLoading: boolean;
};

const useLazyImage = <T extends Element>({ src, placeholder = placeholderImage }: Props): R<T> => {
	const [isLoading, setLoading] = useState(true);
	const [imageSrc, setImageSrc] = useState(placeholder);
	const [imageRef, elementRef] = useState<T>() as [T, (instance: T | null) => void];

	useEffect(() => {
		let observer: IntersectionObserver;

		if (imageRef && isLoading) {
			if (IntersectionObserver) {
				observer = new IntersectionObserver(
					entries => {
						entries.forEach(entry => {
							if (entry.isIntersecting) {
								setImageSrc(src);
								setLoading(false);
								observer.unobserve(imageRef);
							}
						});
					},
					{
						threshold: 0.01,
						rootMargin: '75%',
					}
				);
				observer.observe(imageRef);
			} else {
				setImageSrc(src);
			}
		}

		return () => {
			observer?.unobserve(imageRef);
		};
	}, [src, imageSrc, imageRef, isLoading]);

	return { elementRef, imageSrc, isLoading };
};

export default useLazyImage;
