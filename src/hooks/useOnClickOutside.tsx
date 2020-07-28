import { useEffect, useRef } from 'react';

type Listener = EventListenerOrEventListenerObject;

export default function useOnClickOutside(handler: () => void) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const listener: Listener = e => {
			// Do nothing if clicking ref's element or descendent elements
			if (ref?.current?.contains(e?.target as Node)) {
				return;
			}
			handler();
		};

		document.addEventListener('mousedown', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
		};
	}, [ref, handler]);

	return ref;
}
