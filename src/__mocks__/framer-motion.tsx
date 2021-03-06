import React, { ReactElement } from 'react';

jest.mock('framer-motion', () => ({
	...jest.requireActual<{}>('framer-motion'),
	motion: {
		path: () => <path />,
		svg: () => <svg />,
		div: ({ children, ...rest }: { children: ReactElement; 'data-testid': string }) => <div {...rest}>{children}</div>,
	},
	useMotionValue: jest.fn().mockReturnValue(0),
	useTransform: jest.fn().mockReturnValue(1),
}));
