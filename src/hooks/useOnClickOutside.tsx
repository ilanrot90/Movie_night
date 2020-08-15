import { useEffect, useRef, RefObject } from 'react';

type Listener = EventListenerOrEventListenerObject;

type HTMLTypes = HTMLDivElement;

export default function useOnClickOutside<T extends HTMLTypes>(handler: () => void): RefObject<T> {
	const ref = useRef<T>(null);

	useEffect(() => {
		const listener: Listener = e => {
			// Do nothing if clicking ref's element or descendent elements
			if (ref.current?.contains(e?.target as Node)) {
				return;
			}
			handler();
		};

		document.addEventListener('mousedown', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
		};
	}, [ref, handler]);

	return ref as RefObject<T>;
}
