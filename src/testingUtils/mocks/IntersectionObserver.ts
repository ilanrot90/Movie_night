const windowIntersectionObserver = window.IntersectionObserver;

export const setupIntersectionObserverMock = ({ observe = () => null, unobserve = () => null } = {}) => {
	class IntersectionObserverMock {
		observe = observe;
		unobserve = unobserve;
	}
	(<any>window).IntersectionObserver = IntersectionObserverMock;
};

export const restoreIntersectionObserverMock = () => {
	(<any>window).IntersectionObserver = windowIntersectionObserver;
};
