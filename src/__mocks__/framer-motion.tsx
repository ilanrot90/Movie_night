import React, { ReactElement } from 'react';

jest.mock('framer-motion', () => ({
	motion: {
		path: () => <path />,
		svg: () => <svg />,
		div: ({ children, ...rest }: { children: ReactElement; 'data-testid': string }) => (
			<div data-testid={rest['data-testid']}>{children}</div>
		),
	},
	AnimatePresence: ({ children }: { children: ReactElement }) => <div>{children}</div>,
	useMotionValue: jest.fn().mockReturnValue(0),
	useTransform: jest.fn().mockReturnValue(1),
}));
