import React, { ReactElement } from 'react';

jest.mock('framer-motion', () => ({
	motion: {
		path: () => <path />,
		svg: () => <svg />,
		div: ({ children }: { children: ReactElement }) => <div>{children}</div>,
	},
	AnimatePresence: ({ children }: { children: ReactElement }) => <div>{children}</div>,
	useMotionValue: jest.fn().mockReturnValue(0),
	useTransform: jest.fn().mockReturnValue(1),
}));
