import { useRef, useEffect } from 'react';

export default function usePrevious(value: any) {
	const didMount = useRef<boolean | null>();
	const ref = useRef();

	useEffect(() => {
		ref.current = value;
	}, [value, didMount]);

	return ref.current;
}
