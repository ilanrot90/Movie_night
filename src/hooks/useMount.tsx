import { useEffect, useState } from 'react';

export const useMount = (fn: () => void, cleanUpFn = () => undefined) => {
	const [mounted, setMount] = useState(false);
	useEffect(() => {
		if (!mounted) {
			setMount(true);
			fn();
		}
		return cleanUpFn();
	}, [mounted, fn, cleanUpFn]);
};
